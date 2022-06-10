import db from '../config/db.js';

export const getUser = async (req,res) => {
    const {id} = req.params;
    // const {email} = res.locals.session;
    // console.log(email);
    try{
        const result = await db.query(`
            SELECT * FROM users WHERE id = $1`, [id]
        );
        if(result.rowCount === 0) {return res.status(404).send("User does not exist")};
        
        const count = await db.query(`
            SELECT "name", "visitCount" as count
            FROM users
            WHERE id = $1
        `,[id]);
        
        const urls = await db.query(`
            SELECT  u.id, "shortUrl", "longUrl" as url, u."visitCount"
            FROM urls u
            JOIN "usersUrls" r ON u.id = r."urlId"
            WHERE "userId" = $1           
        `,[id]);
        
        const body = {
            id,
            name: count.rows[0].name,
            visitCount: count.rows[0].count,
            shortenedUrls: urls.rows
        }
        res.status(200).send(body);
    }catch{
        return res.sendStatus(500);
    }
};

export const getRanking = async (req,res) => {
    try{
       const result = await db.query(`
            SELECT us.id, "name", COUNT("urlId") as "linksCount", "visitCount"
            FROM users us
            JOIN "usersUrls" ur ON us.id = ur."userId"
            GROUP BY us.id
            ORDER BY "visitCount" limit 10
        `);

        return res.status(200).send(result.rows);
    } catch{
        return res.sendStatus(500);
    }
};