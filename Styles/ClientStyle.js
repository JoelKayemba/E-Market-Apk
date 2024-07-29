import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Color from './Color';



const ClientStyle = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: Color.grisIcone,
        height:40
      },
      input: {
        paddingLeft: 10,
        flex:1
      },
      containerRecherche: {
        marginHorizontal: 20,
      },
      adresse: {
        flexDirection: 'row',
        marginTop: 5,
        
      },
      textAdresse: {
        fontSize: 12,
        fontFamily:'InriaSerif',
        
        
      },
      containerCategorie: {
        paddingStart:2,
        paddingTop: 0,
      },
      iconeCategorie: {
        height: '100%',
        width: '100%'
      },
      cercleCategorie: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: 10,
        borderWidth: 1,
        borderColor: Color.orange,
      },
      categorieText: {
        fontSize: 10,
        fontFamily:'InriaSerif',
        marginTop: 5, 
        textAlign: 'center', 
        width: 100, 
        paddingRight:10
      },
      textPub: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:10
      },
      containerPub: {
        marginHorizontal: 10,
        marginTop: 20,
      },
      textPourToi: {
        fontWeight: 'bold',
        
        
      },
      textVoirTout:{
        color:Color.orange
      },
    
      
      scrollView: {
        overflow: 'hidden',
      },
      pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        marginHorizontal: 8,
      },
      activeDot: {
        backgroundColor: Color.orange,
      },
      overlay: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        padding: 10,
        borderRadius: 10,
        alignItems:'center'
      },
      overlayText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
      },
      overlayButton: {
        backgroundColor: Color.orange,
        padding: 10,
        borderRadius: 20,
        width:100
      },
      overlayButtonText: {
        color: '#fff',
        textAlign: 'center',
      },
      containerRecommandation:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:5,
        marginTop:10,
        
      },
      containerProduitRecommander: {
        marginHorizontal: 5,
        marginVertical: 5,
        
       
      },
      produitRecommander: {
        width: 180, 
        borderTopEndRadius: 10,
        marginBottom: 10,
        backgroundColor:'white',
        borderRadius:10,
        height:230

        
      },
      nomProduitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginTop: 2,
        marginLeft: 5,
      },
      imageProduit: {
        width: '100%',
        height: 170,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
      },
      
      heartIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 25,
        height: 25,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      },
      nomProduit: {
        fontSize: 15,
        fontWeight: '600',
       
      },
      prixProduit: {
        marginTop: 1,
        marginLeft: 5,
        fontSize: 20,
        fontFamily:'InriaSerif',
        color:Color.orange
      },
      columnWrapper: {
        justifyContent: 'space-between',
      },
      nomBoutique:{
        fontSize:13,
        fontStyle:'italic',
        marginLeft:5,
        marginTop:5
      },
      infoProduit:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5
      },
      quantity:{
        flexDirection:'row',
        marginLeft:5,
        marginTop:2
      },
      quantite:{
        color:Color.vert
      },
      iconDelivery:{
        flexDirection:'row',
        marginRight:5
      }
})
export default ClientStyle