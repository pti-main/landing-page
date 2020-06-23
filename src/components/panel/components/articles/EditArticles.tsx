import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';

import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import MarkdownIt from 'markdown-it';

import PopUp from '../PopUp';

import moment from 'moment';
import 'moment/locale/pl';

import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

const readingTime = require('reading-time');

const mdParser = new MarkdownIt({
    breaks: true,
    html: false
});

const uploadImageQuery = gql`
    mutation($token: String!, $image: String!, $mime: String!) {
        uploadImage(token: $token, image: $image, mime: $mime) {
            success
            message
            data
        }
    }
`;

const deleteArticleQuery = gql`
    mutation($token: String!, $id: String!) {
        deleteArticle(token: $token, id: $id) {
            success
            data
        }
    }
`;

const updateArticleQuery = gql`
    mutation($token: String!, $id: String!, $title: String!, $thumbnail: String, $message: String!) {
        updateArticle(token: $token, id: $id, title: $title, message: $message, thumbnail: $thumbnail) {
            success
            data
        }
    }
`;

const newArticleQuery = gql`
    mutation($token: String!, $id: String, $title: String!, $thumbnail: String, $message: String!) {
        addArticle(token: $token, id: $id, title: $title, message: $message, thumbnail: $thumbnail) {
            success
            data
        }
    }
`;


/* update following queries */
let allArticlesQuery = gql`
    query($token: String!) {
        getAllArticles(token: $token) {
            success
            data
        }
    }
`;
let lastArticlesQuery = gql`
    query($token: String!) {
        getLastArticles(token: $token) {
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


const EditArticles = ({ articles, token, displayToast, darkTheme, newArticle=false }:any) => {
    const { id:ArticleId } = useParams();
    const history = useHistory();
    const fileRef = useRef(null);

    const updateArticleQueries = (cache:any, queryData:any) => {
        if (!queryData.success)
            return;
        const d = (q:any, d:any) => ({
            query: q,
            data: d,
            variables: {
                token
            }
        })
        
        let { getAllArticles, getLastArticles } = JSON.parse(queryData.data);

        cache.writeQuery(d(allArticlesQuery, { getAllArticles }));
        cache.writeQuery(d(lastArticlesQuery, { getLastArticles }));
    }

    const [ article, setArticle ] = useState((!newArticle) ? articles.find((p:any) => p._id === ArticleId) : {
            title: "",
            date: new Date().getTime(),
            thumbnail: null,
            message: "",
            views: 0,
            lastEdit: null,
            messageSnippet: "", 
            path: ""
        });

    const [ uploadImage ] = useMutation(uploadImageQuery);
    const [ deleteArticle ] = useMutation(deleteArticleQuery, {
        update: (cache:any, { data: { deleteArticle }}) => updateArticleQueries(cache, deleteArticle)
    });
    const [ updateArticle ] = useMutation((newArticle) ? newArticleQuery : updateArticleQuery, {
        update: (cache:any, { data }) => {
            updateArticleQueries(cache, data[(newArticle) ? "addArticle" : "updateArticle"])
        }
    });

    const [ popUpSettings, setPopUpSettings ] = useState(defaultPopUpSettings);


    useEffect(() => {
        if (!article)
            return;
        
        let b = article;
        b.message += "\r";
        setArticle(article);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [darkTheme]);

    if (!article) 
        return (<Redirect to="/404"/>);

    moment.locale('pl');

    article.message = article.message.split("\\n").join("\n");

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
        <div className="edit_article"> 
            <div className="info">
                <div className="title">Edytor artykułów</div>

                <div className={`article_image_changer${article.thumbnail ? '' : ' new_image_empty'}`}> 
                    <div className="current_image_wrapper">
                        <img className="current_image" src={article.thumbnail} alt=""/>
                        <img className="current_image_backdrop" src={article.thumbnail} alt=""/>
                        <div className="inner_text">{article.thumbnail ? "" : "Brak wybranego zdjęcia"}</div>
                    </div>
                    <div className="new_image_picker" onClick={() => fileRef.current.click()}>
                        <div className="">Kliknij tutaj aby wybrać nowe zdjęcie</div>
                    </div>
                    
                    <div className="article_edit">Ostatnia edycja: <b>{(article.lastEdit) ? moment(article.lastEdit).fromNow() : "nigdy"}</b></div> 
                    <div className="article_edit">Data utworzenia: <b>{moment(article.date).format('LL')}r.</b></div> 
                
                    { !newArticle &&
                        <div className="article_edit">Liczba wyświetleń: <b>{article.views}</b></div>
                    }

                    <input type="file" ref={fileRef} multiple={false} onChange={async () => {
                        let resp = await onImageUpload(fileRef.current.files[0]);
                        if (resp !== "")
                            setArticle({
                                ...article,
                                thumbnail: resp,
                                message: article.message + "\r"
                            });
                        
                    }} style={{display: "none"}}/>
                </div>

                <div className="article_title">
                    Nazwa artykułu
                    <input value={article.title} onChange={(e:any) => {
                        setArticle({
                            ...article,
                            title: e.target.value,
                            message: article.message + "\r"
                        });
                    }}/>
                </div>

            </div> 

            <MdEditor value={article.message} onImageUpload={onImageUpload} renderHTML={(b:any) => {
                setArticle({
                    ...article,
                    message: b
                });

                const o:string = mdParser.render(b);
                return (
                    <div id="article" className={darkTheme ? "dark-theme" : ""}>
                        <div className="article-container">
                            <div className="image-container">
                                <div className="img" style={{backgroundImage: `url(${article.thumbnail})`}}/>
                            </div>
                            <div className="article-info">
                                <div className="article-title">{article.title.length > 0 ? article.title : "Brak tytułu."}</div>
                                <div className="reading-time">{new Date(article.date).toLocaleDateString("pl-PL", { year: 'numeric', month: 'long', day: 'numeric' })}, {(article.message.length > 200) ? Math.round(readingTime(article.message).minutes) : 1} min czytania</div>
                            </div>
            
                            <div className="message" dangerouslySetInnerHTML={{__html: o}}/>
                        </div>
                    </div>
                );
            }}/>
            <div className="edit_article_buttons">
                <div className="button cancel" onClick={history.goBack}>Anuluj</div>
                <div className="button save" onClick={() => {

                    if (!article.title || (article.message.split(/[\n\r]/g).join("") === ""))
                        return displayToast(false, `Nie podano wystarczających informacji aby ${newArticle ? "dodać nowy" : "zaktualizować"} artykuł.`);

                    updateArticle({variables: {
                        token,
                        id: article._id,
                        title: article.title,
                        message: article.message,
                        thumbnail: article.thumbnail
                    }}).then((data) => {
                        if (!data.data[newArticle ? "addArticle" : "updateArticle"].success)
                            displayToast(false, "Nie udało się zaktualizować artykułu.");
                        else {

                            history.goBack();
                            displayToast(true, `Pomyślnie ${newArticle ? "dodano nowy" : "zaktualizowano"} artykuł.`);
                        }
                    }).catch(() => displayToast(false, `Nie udało się ${newArticle ? "dodać nowego" : "zaktualizować"} artykułu. Spróbuj ponownie później.`));

                    return false;
                }}>Zapisz</div>
                { !newArticle && <div className="button delet_dis_rn" onClick={() => {
                    let message = (
                        <>
                            Czy napewno chcesz
                            <span className="highlight">
                                usunąć
                            </span> artykuł: 
                            <span className="highlight">
                                {article.title}
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
                            deleteArticle({
                                variables: {
                                    token,
                                    id: article._id
                                }
                            }).then((data) => {
                                if (!data.data.deleteArticle.success)
                                    return displayToast(false, "Nie udało się usunąć artykułu, ktoś mógł go usunąć wcześniej.");
                                
                                history.goBack();
                                displayToast(true, "Pomyślnie usunięto artykuł.");     
                            }).catch(() => displayToast(false, "Nie udało się usunąć artykułu. Spróbuj ponownie później.")); 
                        }
                    });
                }}>Usuń artykuł</div> }
            </div>

            <PopUp {...popUpSettings}/>
        </div>
    );
}

export default EditArticles;