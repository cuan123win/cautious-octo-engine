import express from 'express';
import dl from 'youtube-downloader-2';

const app = express();
const PORT = 9000;

app.use(express.json());

app.get('/', async (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const info = await dl(url);
        res.json({
            urls: info.urls,
            video: info.video,
            audio: info.audio,
            videoTitle: info.videoTitle
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching video info' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
