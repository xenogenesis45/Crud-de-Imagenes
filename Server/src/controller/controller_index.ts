import { Request, Response } from "express";

import path from 'path/posix';
import fs from 'fs'

class IndexController {

    public index(req: Request, res: Response) {
        res.json('App de imagenes')
    }

    async getImage(req: Request, res: Response, cnno: any) {
        try {
            cnno.query('SELECT * FROM images', (err: any, result: any) => {
                if (err) return res.status(500).send('Error en la consulta')

                result.map((img: any) => {
                    fs.writeFileSync(path.join(__dirname, '../dbImages/' + img.id + '-imagen.png'), img.data)
                })
                const imagedir = fs.readdirSync(path.join(__dirname, '../dbImages/'))
                res.json(imagedir)
                console.log(imagedir)
            })
        } catch (error) {
            console.log('Error al cargar imagen', error);
        }
    }

    async createImage(req: Request, res: Response, cnno: any) {
        try {
            const type = req.file?.mimetype;
            const name = req.file?.originalname;
            const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file?.filename))

            cnno.query('INSERT INTO images set ?', [{ type, name, data }], (err: any, result: any) => {
                console.log(err, result);
            })
        } catch (error) {
            console.log('Error al cargar imagen', error);
        }
        finally {
            res.json({ text: 'Bien hecho' })
        }
    }

    async DeleteImage(req: Request, res: Response, cnno: any) {
        const { id } = req.params
        try {
            cnno.query('DELETE FROM images WHERE id = ?', [id], (err: any, result: any) => {
                if (err) return res.status(500).send('Error en la consulta')

                fs.unlinkSync(path.join(__dirname, '../dbImages/' + req.params.id + '-imagen.png'))

                res.send('imagen eliminada')
            })
        } catch (error) {
            console.log('Error al cargar imagen', error);
        }
    }

}

const indexController = new IndexController();
export default indexController