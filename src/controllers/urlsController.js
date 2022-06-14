import db from './../config/db.js';
import joi from 'joi';
import { nanoid } from 'nanoid';


export const shortener = async (req, res) => {
    const url = req.body;
    const { email } = res.locals.session;

    const urlSchema = joi.object({
        url: joi.string().uri().required()
    });
    const validation = urlSchema.validate(url, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    };

    const short = nanoid();

    try {
        const userId = await db.query(`SELECT id FROM users WHERE email = $1`, [email]);

        const urlId = await db.query(`
          INSERT INTO urls("longUrl", "shortUrl")
          VALUES ($1, $2)
          RETURNING id
        `, [url.url, short]
        );

        await db.query(`
            INSERT INTO "usersUrls"("userId","urlId")
            VALUES ($1,$2)
        `, [userId.rows[0].id, urlId.rows[0].id]
        );

        res.status(201).send({ shortUrl: short });
    } catch {
        return res.sendStatus(500);
    };
};

export const getURL = async (req, res) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        return res.sendStatus(400);
    }

    try {
        const result = await db.query(`
            SELECT id,"shortUrl","longUrl" FROM urls WHERE id = $1`, [id]);

        const returnBody = {
            id,
            shortUrl: result.rows[0].shortUrl,
            url: result.rows[0].longUrl
        }
        return res.status(200).send(returnBody);

    } catch (error) {
        return res.status(404).send("URL not saved");
    }
};

export const openURL = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const result = await db.query(`
            SELECT "longUrl", us."userId"
            FROM urls ur
            JOIN "usersUrls" us ON ur.id = us."urlId" 
            WHERE "shortUrl" = $1`, [shortUrl]
        );

        await db.query(` 
            UPDATE urls SET "visitCount" = COALESCE("visitCount",0) + 1
            WHERE "shortUrl" = $1`, [shortUrl]
        );

        await db.query(` 
            UPDATE users SET "visitCount" = COALESCE("visitCount",0) + 1
            WHERE id = $1`, [result.rows[0].userId]
        );

        res.status(200).redirect(result.rows[0].longUrl);

    } catch (error) {
        return res.status(404).send("URL not saved");
    }
};

export const deleteURL = async (req, res) => {
    const { id } = req.params;
    const { email } = res.locals.session;
    let test = false;

    try {
        const testUrl = await db.query(`
            SELECT * FROM urls WHERE id = $1`, [id]
        );
        if (testUrl.rowCount === 0) return res.status(404).send("URL not saved");

        const user = await db.query(`
            SELECT id FROM users WHERE email = $1
        `, [email]);

        const url = await db.query(`
            SELECT "urlId" FROM "usersUrls" WHERE "userId" = $1
        `, [user.rows[0].id]);

        url.rows.map(obj => {
            if (obj.urlId === Number(id)) test = true;
        });

        if (!test) return res.status(401).send("Permission denied");

        await db.query(`
            DELETE FROM "usersUrls" WHERE "urlId"=$1`, [id]
        );
        await db.query(`
            DELETE FROM urls WHERE id=$1`, [id]
        );

        return res.sendStatus(204);
    } catch {
        return res.sendStatus(500);
    }
};