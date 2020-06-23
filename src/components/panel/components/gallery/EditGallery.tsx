import React, { useState, useRef } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/pl';

import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

import PopUp from '../PopUp';

const uploadImageQuery = gql`
    mutation($token: String!, $image: String!, $mime: String!) {
        uploadImage(token: $token, image: $image, mime: $mime) {
            success
            message
            data
        }
    }
`;

const deleteImageQuery = gql`
    mutation($token: String!, $id: String!) {
        deleteImage(token: $token, id: $id) {
            success
            data
        }
    }
`;

const updateImageQuery = gql`
    mutation($token: String!, $id: String!, $title: String!, $image: String!) {
        updateImage(token: $token, id: $id, title: $title, image: $image) {
            success
            data
            message
        }
    }
`;

const newImageQuery = gql`
    mutation($token: String!, $id: String, $title: String!, $image: String!) {
        addImage(token: $token, id: $id, title: $title, image: $image) {
            success
            data
        }
    }
`;


/* update following queries */
let allImagesQuery = gql`
    query($token: String!) {
        getAllGallery(token: $token) {
            success
            data
        }
    }
`;
let lastImagesQuery = gql`
    query($token: String!) {
        getLastImages(token: $token) {
            success
            data
        }
    }
`;

const defaultPopUpSettings = {
    show: false,
    message: (
        <>Nie określono wiadomości.</>
    ),
    reset: () => {},
    callback: () => {}
};


const EditGallery = ({ images, token, displayToast,  newImage=false }:any) => {
    const { id:ImageId } = useParams();
    const history = useHistory();
    const fileRef = useRef(null);

    const updateImageQueries = (cache:any, queryData:any) => {
        if (!queryData.success)
            return;
        const d = (q:any, d:any) => ({
            query: q,
            data: d,
            variables: {
                token
            }
        })
        
        let { getAllGallery, getLastImages } = JSON.parse(queryData.data);

        cache.writeQuery(d(allImagesQuery, { getAllGallery }));
        cache.writeQuery(d(lastImagesQuery, { getLastImages }));
    }

    const [ image, setImage ] = useState((!newImage) ? images.find((p:any) => p._id === ImageId) : {
            title: "",
            date: new Date().getTime(),
            image: "",
            lastEdit: null
        });
    const [ popUpSettings, setPopUpSettings ] = useState(defaultPopUpSettings);

    const [ uploadImage ] = useMutation(uploadImageQuery);
    const [ deleteImage ] = useMutation(deleteImageQuery, {
        update: (cache:any, { data: { deleteImage }}) => updateImageQueries(cache, deleteImage)
    });
    const [ updateImage ] = useMutation((newImage) ? newImageQuery : updateImageQuery, {
        update: (cache:any, { data }) => {
            updateImageQueries(cache, data[(newImage) ? "addImage" : "updateImage"])
        }
    });

    if (!image) 
        return (<Redirect to="/404"/>);

    moment.locale('pl');

    const onImageUpload = (file:any) => 
        new Promise(resolve => {
            const fileTypes = ["png", "jpeg", "jpg", "gif"];

            if (fileTypes.indexOf(file.type.split("image/").join("")) === -1) {
                displayToast(false, "Niepoprawny format pliku. Akceptowane rozszerzenia plików to " + fileTypes.join(", "));
                resolve("");
                return;
            }

            const reader = new FileReader();                
            reader.onload = data => {
                
                uploadImage({ variables: {
                    token,
                    mime: file.type,
                    image: data.target.result
                }}).then((resp:any) => {
                    if (resp.data.uploadImage.success) {
                        displayToast(true, "Pomyślnie przesłano plik.");
                        resolve(window.API_URL + resp.data.uploadImage.data);
                    } else if (resp.data.uploadImage.message === "file_size_too_big")
                        displayToast(false, "Obraz jest za duży, maksymalna wielkość to 15MB.");
                    else
                        displayToast(false, "Nie udało się przesłać obrazu. Spróbuj ponownie.");
                }).catch(() => displayToast(false, "Nie udało się przesłać obrazu. Spróbuj ponownie później."));
            };
            reader.readAsDataURL(file); 
        });

    return (
        <div className="edit_image"> 
            <div className="info">
                <div className="title">Edytor zdjęcia</div>

                <div className={`image_changer${image.image ? '' : ' new_image_empty'}`}>
                    <div className="current_image_wrapper">
                        <img className="current_image" src={image.image} alt=""/> {/* On future kox naming */}
                        <img className="current_image_backdrop" src={image.image} alt=""/> {/* STFU */}
                        <div className="inner_text">{image.image ? "" : "Brak wybranego zdjęcia"}</div>
                    </div>
                    <div className="new_image_picker" onClick={() => fileRef.current.click()}>
                        <div className="">Kliknij tutaj aby wybrać nowe zdjęcie</div>
                    </div>

                    <div className="image_edit">Ostatnia edycja: <b>{(image.lastEdit) ? moment(image.lastEdit).fromNow() : "nigdy"}</b></div> 
                    <div className="image_edit">Data utworzenia: <b>{moment(image.date).format('LL')}r.</b></div> 
                
                    <input type="file" ref={fileRef} multiple={false} onChange={async () => {
                        let resp = await onImageUpload(fileRef.current.files[0]);
                        if (resp !== "")
                            setImage({
                                ...image,
                                image: resp
                            });
                        
                    }} style={{display: "none"}}/>
                </div>

                <div className="image_title">
                    Tytuł zdjęcia
                    <input value={image.title} onChange={(e:any) => {
                        setImage({
                            ...image,
                            title: e.target.value
                        });
                    }}/>
                </div>
            </div> 

            <div className="edit_image_buttons">
                <div className="button cancel" onClick={history.goBack}>Anuluj</div>
                <div className="button save" onClick={() => {

                    if (!image.title || !image.image)
                        return displayToast(false, `Nie podano wystarczających informacji aby ${newImage ? "dodać nowe" : "zaktualizować"} zdjęcie.`);

                    updateImage({variables: {
                        token,
                        id: image._id,
                        title: image.title,
                        image: image.image
                    }}).then((data) => {
                        if (!data.data[newImage ? "addImage" : "updateImage"].success)
                            displayToast(false, "Nie udało się zaktualizować zdjęcia.");
                        else {

                            history.goBack();
                            displayToast(true, `Pomyślnie ${newImage ? "dodano nowy" : "zaktualizowano"} artykuł.`);
                        }
                    }).catch(() => displayToast(false, `Nie udało się ${newImage ? "dodać nowego" : "zaktualizować"} zdjęcia. Spróbuj ponownie później.`));

                    return false;
                }}>Zapisz</div>
                { !newImage && <div className="button delet_dis_rn" onClick={() => {//`Czy napewno chcesz usunąć zdjęcie: ${image.title}?`
                    let message = (
                        <>
                            Czy napewno chcesz
                            <span className="highlight">
                                usunąć
                            </span> zdjęcie: 
                            <span className="highlight">
                                {image.title}
                            </span>?
                        </>
                    ); 
                    setPopUpSettings({
                        show: true,
                        message,
                        reset: () => {
                            setPopUpSettings({
                                ...defaultPopUpSettings,
                                message
                            });
                        },
                        callback: () => {
                            deleteImage({
                                variables: {
                                    token,
                                    id: image._id
                                }
                            }).then((data) => {
                                if (!data.data.deleteImage.success)
                                    return displayToast(false, "Nie udało się usunąć zdjęcia, ktoś mógł go usunąć wcześniej.");
                                
                                history.goBack();
                                displayToast(true, "Pomyślnie usunięto zdjęcie.");     
                            }).catch(() => displayToast(false, "Nie udało się usunąć zdjęcia. Spróbuj ponownie później."));
                        }
                    });
                }}>Usuń zdjęcie</div> }
            </div>
 
            <PopUp {...popUpSettings}/>
        </div>
    );
}

export default EditGallery;