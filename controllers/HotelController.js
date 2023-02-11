import Hotel from "../models/Hotel.js";
export const createHotel = async (req, res) => {
    const newHotel = await new Hotel(req.body);

    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);

    } catch (error) {
        res.status(500).json(error)
    }
}
export const updateHotel = async (req, res) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateHotel);

    } catch (error) {
        res.status(500).json(error);

    }
}
export const deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel  has been deleted success");

    } catch (error) {
        res.status(500).json(error);

    }
}
export const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (hotel) {
            res.status(200).json(hotel);
        } else {
            res.status(501).json("Can not find hotel !")
        }

    } catch (error) {
        res.status(500).json({ "error": error })
    }
}
export const getHotels = async (req, res) => {

    const { min, max, ...others } = req.query;

    try {
        const hotel = await Hotel.find(
            {
                ...others,
                cheapestPrice: { $gt: min || 50000, $lt: max || 100000000 }
            }).limit(req.query.limit);

        if (hotel) {
            res.status(200).json(hotel);
        } else {
            res.status(501).json("Can not find hotel !")
        }

    } catch (error) {
        res.status(500).json({ "error": error })
    }
}
export const getByCity = async (req, res, next) => {
    var cities;
    if (req.query.cities) {
        cities = req.query?.cities.split(',');
    }


    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: { $regex: city, $options: 'i' } });
            })
        );
        res.status(200).json(list);
        // res.status(200).json(list);


    } catch (error) {
        // res.status(500).json({ "error": error })
        next(error)
    }
}
export const getByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
        const villaCount = await Hotel.countDocuments({ type: "villas" });
        const resortCount = await Hotel.countDocuments({ type: "resorts" });
        const homestayCount = await Hotel.countDocuments({ type: "homestay" });
        // const hotelCount =await Hotel.countDocuments({type:"hotel"});
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "villas", count: villaCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "homestays", count: homestayCount },
        ]);


    } catch (error) {

        next(error)
    }
}
