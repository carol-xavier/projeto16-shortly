import db from '../config/db.js';

export const getUser = async (req,res) => {
    const {id} = req.params;

    try{
        const result = await db.query(`
            SELECT * FROM users WHERE id = $1`, [id]
        );
        if(result.rowCount === 0) return res.status(404).send("User does not exist");

        const count = await db.query(`
            SELECT "name", SUM(r."visitCount") as count
            FROM "usersUrls" u
            JOIN urls r ON u."urlId" = r.id
            JOIN users n ON u."userId" = n.id
            WHERE "userId" = $1
            GROUP BY n.name
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

};