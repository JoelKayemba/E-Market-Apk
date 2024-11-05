import { configureStore } from "@reduxjs/toolkit";
import {boutiqueReducer} from "./reducers/boutiqueReducer";
import clientReducer from "./reducers/clientReducer";
import favoriteReducer from "./reducers/favoriteReducer";
import mailReducer from "./reducers/mailReducer";
import notificationReducer from "./reducers/notificationReducer";
import orderReducer from "./reducers/orderReducer";
import prestataireReducer from "./reducers/prestataireReducer";
import { productReducer } from "./reducers/productReducer";
import profileReducer from "./reducers/profileReducer";
import serviceReducer from "./reducers/serviceReducer";
import MesBoutiquesReducer from "./reducers/MesBoutiquesReducer";
import annonceReducer from "./reducers/annonceReducer";
import deviseReducer from "./reducers/deviseReducer";

const store = configureStore(
    {
        reducer:{
            products: productReducer,
            clients: clientReducer,
            profiles: profileReducer,
            boutiques: boutiqueReducer,
            orders: orderReducer,
            services: serviceReducer,
            prestataires: prestataireReducer,
            notifications: notificationReducer,
            mails: mailReducer,
            favorite: favoriteReducer,
            mesBoutiques: MesBoutiquesReducer,
            annonces: annonceReducer,
            devise: deviseReducer,

        }
    }
)

export default store;