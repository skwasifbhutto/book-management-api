import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler'; // ✅ Add this

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', bookRoutes);
app.use(errorHandler); 

const PORT = process.env.PORT || 3000;

app.get(`/`,(req,res)=>{
    return res.status(200).json({
        messsge:"Welcome to Homepage"
    })
})


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
