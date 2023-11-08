import React, { useState } from 'react';
import './App.css';

function App() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Виолета, "Беременна в 16".Самый тяжелый выпуск за историю проекта.',
      content: 'Маме 14 лет, ребенок с серьезной патологией. Что с ними сейчас?',
      imageUrl: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6527b921ba9cbf61340e9da9_6527d3242ed1f07a2b233008/scale_2400',
      category: 'Тяжелые выпуски', 
    },
    {
      id: 2,
      title: 'Что остается за кадром русского сезона проекта "Беременна в 16"',
      content: 'Забеременев в 16 лет, девушка может столкнуться со множеством трудностей, пережить их и стать в итоге счастливой молодой матерью. Именно такие истории рассказывались зрителям американского проекта «16 and pregnant», а затем и его украинской версии «Беременна в 16».',
      imageUrl: 'https://avatars.dzeninfra.ru/get-zen_doc/1532998/pub_5c8a3f2dc650eb00b328310f_5c8a3f2f44a47600b4fabbc1/scale_1200',
      category: 'За кадром', 
    },
    {
      id: 3,
      title: '“Беременна в 16 Россия”, 2 сезон. Почему все стало еще хуже, но его смотрят?',
      content: 'Сил нет пересказать, как у меня подгорает от преступного проекта “Беременна в 16. Россия”. То, что числится это на каком-то неизвестном телеканале, не играет роли - на Ютубе ролики набирают миллион просмотров за считанные дни.',
      imageUrl: 'https://avatars.dzeninfra.ru/get-zen_doc/1856150/pub_5e99c2783ea0b71cd1a2615f_5e99cce6603e850f1fe7f546/scale_2400',
      category: 'За кадром', 
    },

  ]);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Все категории');

  // Создаем состояние для хранения комментариев к статьям
  const [comments, setComments] = useState({});
  // Создаем состояние для нового комментария
  const [newComment, setNewComment] = useState('');

  const handleArticleClick = (articleId) => {
    if (isEditing) {
      setIsEditing(false);
      setEditedArticle(null);
    } else {
      setSelectedArticle(articleId);
    }
  };

  const resetSelectedArticle = () => {
    setSelectedArticle(null);
    setIsEditing(false);
    setEditedArticle(null);
  };

  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value,
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSaveArticle = () => {
    if (
      newArticle.title.trim() !== '' &&
      newArticle.content.trim() !== '' &&
      newArticle.imageUrl.trim() !== ''
    ) {
      if (isEditing && editedArticle) {
        const updatedArticles = articles.map((article) =>
          article.id === editedArticle.id ? { ...article, ...newArticle } : article
        );
        setArticles(updatedArticles);
        setIsEditing(false);
        setEditedArticle(null);
      } else {
        const newId = articles.length + 1;
        const updatedArticles = [
          ...articles,
          { id: newId, ...newArticle },
        ];
        setArticles(updatedArticles);
      }
      setNewArticle({ title: '', content: '', imageUrl: '', category: '' });
    } else {
      alert('Заполните все обязательные поля');
    }
  };

  const deleteArticle = (articleId) => {
    const updatedArticles = articles.filter(
      (article) => article.id !== articleId
    );
    setArticles(updatedArticles);
    setIsEditing(false);
    setEditedArticle(null);
  };

  const handleEditArticle = (articleId) => {
    const articleToEdit = articles.find((article) => article.id === articleId);
    if (articleToEdit) {
      setIsEditing(true);
      setEditedArticle(articleToEdit);
      setNewArticle({ ...articleToEdit }); // Заполняем форму данными редактируемой статьи
    }
  };

  // Фильтрация статей на основе выбранной категории
  const filteredArticles = selectedCategory === 'Все категории'
    ? articles
    : articles.filter((article) => article.category === selectedCategory);

  // Функция для добавления комментария к статье
  const addComment = (articleId) => {
    if (newComment.trim() === '') {
      return;
    }
    // Создаем новый комментарий
    const newCommentObj = {
      text: newComment,
    };
    // Копируем текущие комментарии к статье и добавляем новый комментарий
    const articleComments = comments[articleId] || [];
    const updatedComments = [...articleComments, newCommentObj];
    // Обновляем состояние комментариев
    setComments({
      ...comments,
      [articleId]: updatedComments,
    });
    // Сбрасываем текст нового комментария
    setNewComment('');
  };

  // Функция для удаления комментария
  const deleteComment = (articleId, commentIndex) => {
    const articleComments = comments[articleId] || [];
    const updatedComments = [
      ...articleComments.slice(0, commentIndex),
      ...articleComments.slice(commentIndex + 1),
    ];
    setComments({
      ...comments,
      [articleId]: updatedComments,
    });
  };

  return (
    <div className="App">
      <h1 className="header">Блог про Беременна в 16</h1>
      <div className="category-filter">
        <label>Фильтр по категории:</label>
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
          <option value="Все категории">Все категории</option>
          <option value="Тяжелые выпуски">Тяжелые выпуски</option>
          <option value="За кадром">За кадром</option>
          <option value="Жизнь после проекта">Жизнь после проекта</option>
        </select>
      </div>
      {selectedArticle === null ? (
        <div>
          <ul className="article-list">
            {filteredArticles.map((article) => (
              <li key={article.id} className="article-item">
                <div className="article-thumbnail">
                  <img src={article.imageUrl} alt={article.title} />
                </div>
                <div className="article-details">
                  <h2 className="article-title">{article.title}</h2>
                  <button onClick={() => handleArticleClick(article.id)}>
                    {isEditing ? 'Отмена' : 'Подробнее'}
                  </button>
                  <button onClick={() => deleteArticle(article.id)}>
                    Удалить
                  </button>
                  {isEditing ? (
                    <button onClick={() => handleEditArticle(article.id)}>
                      Сохранить изменения
                    </button>
                  ) : (
                    <button onClick={() => handleEditArticle(article.id)}>
                      Редактировать
                    </button>
                  )}
                </div>
                {/* Форма для добавления комментария */}
                <div className="add-comment-form">
                  <input
                    type="text"
                    placeholder="Добавить комментарий"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button onClick={() => addComment(article.id)}>
                    Добавить комментарий
                  </button>
                </div>
                {/* Список комментариев */}
                <ul className="comment-list">
                  {comments[article.id] &&
                    comments[article.id].map((comment, index) => (
                      <li key={index} className="comment-item">
                        <p>{comment.text}</p>
                        <button onClick={() => deleteComment(article.id, index)}>
                          Удалить
                        </button>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="add-article-form">
            <h2>{isEditing ? 'Редактировать статью' : 'Добавить новую статью'}</h2>
            <div>
              <input
                type="text"
                placeholder="Заголовок"
                name="title"
                value={newArticle.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <textarea
                placeholder="Содержание"
                name="content"
                value={newArticle.content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <input
                type="text"
                placeholder="URL изображения"
                name="imageUrl"
                value={newArticle.imageUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Категория"
                name="category"
                value={newArticle.category}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleSaveArticle}>
              {isEditing ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </div>
      ) : (
        <div className="article">
          <h2 className="article-title">
            {articles[selectedArticle - 1].title}
          </h2>
          <p className="article-content">
            {articles[selectedArticle - 1].content}
          </p>
          <img
            src={articles[selectedArticle - 1].imageUrl}
            alt={articles[selectedArticle - 1].title}
          />
          <button onClick={resetSelectedArticle}>
            Вернуться к списку статей
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
