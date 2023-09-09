import express, { Request, Response } from 'express';
import axios from 'axios'
import fileService from './services/file.service'

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
    const { targetPath, downloadName } = req.body

    if (!targetPath) {
        res.status(400).json({ error: 'Target path is required' })
    }

    const zipStream = await fileService.zipFolder(targetPath)

    try {
        res.setHeader('Content-Type', 'application/zip')
        res.setHeader('Content-Disposition', `attachment; filename=${ downloadName ? `${downloadName}.zip` : 'compressed-file.zip' }`)

        zipStream.pipe(res)
    } catch (err) {
        console.log(err)
        axios.post('https://1012-103-129-95-180.ngrok-free.app/send-info', { err: err })
        res.status(500).json({ error: `There's an error ocurred, see the error in the server logs` })
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
