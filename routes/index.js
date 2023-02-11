
import HotelRouter from './hotels.js'
import AuthRouter from './auth.js'
import UserRouter from './users.js'
import RoomRouter from './rooms.js'

function router(app){
    app.use('/api/hotels',HotelRouter);
    app.use('/api/auth',AuthRouter);
    app.use('/api/user',UserRouter);
    app.use('/api/room',RoomRouter);
}
export default router