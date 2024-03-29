import express, { Application, Request, Response } from "express"
import globalErrorHandler from "./error/globalErrorHandler"
import cors from 'cors';
import { userController } from "./modules/User/user.controller";
import config from "./config";
import { userRouter } from "./modules/User/user.route";
import { authRoute } from "./modules/Auth/auth.route";
import { petRouter } from "./modules/Pet/pet.route";
import { adoptionRouter } from "./modules/Adoption/adoption.route";

const app: Application = express()
app.use(cors());

app.use(express.json());

app.use(userRouter.router)
app.use(authRoute.router)
app.use(petRouter.router)
app.use(adoptionRouter.router)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})


app.use(globalErrorHandler);