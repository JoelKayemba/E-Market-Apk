import Color from "./Color";
import { StyleSheet, Text, View } from 'react-native'

const adresseStyle=StyleSheet.create({
    container: {
        flex: 1,
       paddingBottom:5
    },
    modalContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop:30
    },
    textTitre: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Color.grey,
        marginBottom: 15,
        padding: 10,
    },
    bouton1: {
        backgroundColor: Color.vert,
        borderRadius: 50,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bouton2: {
        backgroundColor: Color.bleuTransparent,
        borderRadius: 50,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bouton3: {
        backgroundColor: Color.orange,
        borderRadius: 50,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width:300
    },
    boutonTexte: {
        color: 'white',
        textAlign: 'center',
    },
    adresseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color.grey,
    },
    adresseActions: {
        flexDirection:'row',
        

    },
    defaultText: {
        color: Color.orange,
        fontWeight: 'bold',
    },
});

export default adresseStyle