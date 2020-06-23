import React from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import { Link } from 'react-router-dom';

const ArticleListItem = ({ data }:any) => {
    moment.locale('pl');

    return (
        <div className="article_list_item">
            <div className="image_container">
                <img src={data.thumbnail} alt="" className="article_image"/>
                <div className="article_image_fallback">Brak zdjęcia</div>
            </div>
            <div className="info_container">
                <div className="info_container_title">
                    {data.title}
                </div>
                <div className="info_container_data">
                    <div className="info_container_data_entry">
                        <div className="info_container_data_entry_title">
                            Wiadomość
                        </div>
                        {data.messageSnippet}
                    </div>
                    <div className="info_container_data_grid">
                        <div className="info_container_data_entry">
                            <div className="info_container_data_entry_title">
                                Data utworzenia
                            </div>
                            {moment(data.date).format('DD.MM.YYYY')} ({moment(data.date).fromNow()})
                        </div>
                        <div className="info_container_data_entry">
                            <div className="info_container_data_entry_title">
                                Ostatnia edycja
                            </div>
                            { data.lastEdit ? moment(data.lastEdit).fromNow() : "Nigdy" }
                        </div>
                    </div>
                </div>

                <Link to={`/panel/articles/edit/${data._id}`} className="info_container_button">
                    Edytuj ten artykuł
                </Link>
            </div>
        </div>
    );
}

export default ArticleListItem;