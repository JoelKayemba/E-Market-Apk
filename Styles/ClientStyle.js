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
        fontWeight:'100',
      },
      containerCategorie: {
        marginHorizontal: 10,
        marginTop: 10,
      },
      iconeCategorie: {
        height: 40,
        width: 40,
      },
      cercleCategorie: {
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderColor: Color.grisIcone,
        backgroundColor:'#fff',
        marginRight: 30,
        marginVertical: 10,
        borderWidth:1,
        borderColor:Color.orange
      },
      firstCategorie: {
        flexDirection: 'row',
        
      },
      secondCategorie: {
        flexDirection: 'row',
        
      },
      categorieText: {
        fontSize: 15,
        fontWeight: 'bold',
      },
      typeCategorie: {
        fontSize: 10,
        marginTop: -10,
        fontWeight: '500',
      },
      typeCategorie1: {
        fontSize: 10,
        marginTop: -10,
        fontWeight: '500',
        paddingTop: 0,
        paddingLeft: 15,
      },
      typeCategorie2: {
        fontSize: 10,
        marginTop: -10,
        fontWeight: '500',
        paddingTop: 0,
        paddingLeft: 10,
      },
      typeCategorie3: {
        fontSize: 10,
        marginTop: -10,
        fontWeight: '500',
        paddingTop: 0,
        paddingLeft: 20,
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
        marginHorizontal:10,
        marginTop:10
      },
      containerProduitRecommander:{
        flexDirection:'row',
        marginHorizontal:10,
        justifyContent:'space-between',
        marginVertical:10
      },
      produitRecommander:{
        height:280,
  
        borderRadius:10
      },
      imageProduit:{
        width:180,
        height:170,
        borderRadius:10
      },
      heartIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 25,
        height: 25,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      },
      nomProduit:{
        fontSize:16,
        fontWeight:'600',
        marginTop:2,
        marginLeft:5
      },
      prixProduit:{
        marginTop:5,
        marginLeft:5,
        fontSize:20,
        color:Color.orange
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