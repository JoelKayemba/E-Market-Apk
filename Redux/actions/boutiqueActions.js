import API_BASE_URL from "../../ApiConfig";

export const setFieldValue = (field, value) => ({
  type: 'SET_FIELD_VALUE',
  field,
  value,
});

export const setIdClient = (idclient) => ({
  type: 'SET_ID_CLIENT',
  idclient,
});

export const setImages = (images) => ({
  type: 'SET_IMAGES',
  images,
});

export const setBoutiqueId = (idBoutique) => ({
  type: 'SET_BOUTIQUE_ID',
  idBoutique,
});

export const ajouterBoutiqueAction = (formData, navigation) => {
  return async (dispatch) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nom', formData.nom);
      formDataToSend.append('type', formData.type);

      // Ajouter chaque catégorie individuellement
      formData.categorie.forEach((category) => {
        formDataToSend.append('categorie[]', category);  // Utilisez 'categorie[]' si le backend attend un tableau.
      });

      formDataToSend.append('email', formData.email);
      formDataToSend.append('numero_telephone', formData.numero_telephone);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('idclient', formData.idclient);

      // Ajouter les images dans formData
      formData.images.forEach((image, index) => {
        formDataToSend.append('images', {
          uri: image,
          type: 'image/jpeg',
          name: `image${index + 1}.jpg`,
        });
      });

      const response = await fetch(`${API_BASE_URL}/boutique/ajoutBoutique`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();

      if (response.ok) {
        // Stocker l'ID de la boutique dans le state Redux
        dispatch(setBoutiqueId(result.idBoutique));  // Assurez-vous que le backend renvoie l'ID de la boutique

        // Réinitialiser le formulaire et naviguer vers la prochaine étape
        dispatch({ type: 'RESET_FORM' });
        navigation.reset({
          index: 0,
          routes: [{ 
            name: 'AjoutLoading', 
            params: { boutique: result } // Transmettez ici les données de la boutique
          }],
        });
      } else {
        alert(result.message || 'Erreur lors de l\'ajout de la boutique');
      }
    } catch (error) {
      alert('Erreur lors de l\'ajout de la boutique');
    }
  };
};
