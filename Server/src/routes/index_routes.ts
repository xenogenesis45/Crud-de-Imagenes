import { Router, Request, Response } from 'express'
import multer from 'multer';
import path from 'path/posix';
import Pool from '../database';
import fs from 'fs'

import indexController from '../controller/controller_index';
import { runInThisContext } from 'vm';


const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req: Request, file, cb) => {
        cb(null, Date.now() + '-imagen-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('images')




class IndexRoute {

    // async getConnection(req: Request, res: Response, cnno: any) {
    //     try {
    //         const type = req.file?.mimetype;
    //         const name = req.file?.originalname;
    //         const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file?.filename))

    //         cnno.query('INSERT INTO images set ?', [{ type, name, data }], (err: any, result: any) => {
    //             console.log(err, result);
    //         })
    //     } catch (error) {
    //         console.log('Error al cargar imagen', error);
    //     }
    //     finally {
    //         res.json({ text: 'Bien hecho' })
    //     }
    // }


    public router: Router = Router();
    public constructor() {
        this.config();
    }
    async config() {

        this.router.get('/', (req, res) => {
            res.send('bienvenidos')
            indexController.index
        });

        // this.router.post('/images/post', fileUpload, async (req: any, res: Response) => {
        //     console.log(req.file)
        //     await this.getConnection(req, res, await this.router);
        //     // req.getConnection((err: any, conn: any) => {
        //     //     if (err) return res.status(500).send('server error')

        //     //     const type = req.file.mimetype;
        //     //     const name = req.file.originalname;
        //     //     const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))

        //     //     conn.query('INSERT INTO images set ?', [{ type, name, data }], (err: any, result: any) => {
        //     //         console.log(err, result);
        //     //         // if (err) {
        //     //         //     return res.status(500).send('server error')
        //     //         // }
        //     //         res.send('imagen guardada')
        //     //     })
        //     // })
        //     // console.log(req.file)
        //     // res.send('imagen guardada')
        // })

        // this.router.post('/images/post', fileUpload, async (req: any, res: Response) => {
        //     console.log(req.file)
        //     console.info('imagen guardada');
        //     await this.getConnection(req, res, await this.asignatConexion());

        // })

        this.router.get('/images/get', async (req: Request, res: Response) => {
            indexController.getImage(req, res, await this.asignatConexion());
        })

        this.router.post('/images/post', fileUpload, async (req: any, res: Response) => {
            console.log(req.file)
            console.info('imagen guardada');
            await indexController.createImage(req, res, await this.asignatConexion());

        })

        this.router.delete('/images/delete/:id', async (req: Request, res: Response) => {
            indexController.DeleteImage(req, res, await this.asignatConexion());
        })
    }

    async asignatConexion() {
        return await (new Pool()).getConn();
    }
}

export const indexRoute = new IndexRoute();
export default indexRoute.router;

