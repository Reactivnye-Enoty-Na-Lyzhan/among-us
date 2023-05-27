import classNames from 'classnames';
import React, { FC, useState } from 'react';
import './EditForm.css';
import { useValidation } from '@/hooks/useValidation';
import { validation } from '@/utils/validation';
import { useNavigate } from 'react-router-dom';
import {
  useCreatePostMutation,
  useGetPostsDataQuery,
} from '@/store/forum/forum.api';

const ForumEditPostForm: FC = () => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [text, setText] = useState<string | undefined>(undefined);

  const { refetch } = useGetPostsDataQuery();
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();
  const {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  } = useValidation([
    { field: 'title', validation: validation.notEmpty },
    { field: 'text', validation: validation.notEmpty },
  ]);

  const onCreateThemeButtonClick = async () => {
    if (validateForm({ title, text })) {
      if (title && text) {
        await createPost({ title, text });
        refetch();
        navigate('/forum');
      }
    }
  };

  return (
    <div>
      <label
        className={classNames('forum-input', 'forum-form__input', {
          'forum-input_invalid': validationData.title?.isValid === false,
        })}>
        <span className="forum-input__label">Заголовок темы</span>
        <input
          className="forum-input__input"
          value={title}
          maxLength={250}
          onChange={e => {
            clearFieldValidation('title');
            validateField('title', e.currentTarget.value);
            setTitle(e.currentTarget.value);
          }}
          onBlur={() => {
            validateField('title', title);
          }}
        />
        <div
          className="forum-input__validation"
          title={
            validationData.title?.isValid === false
              ? validationData.title?.text
              : undefined
          }>
          {validationData.title?.isValid === false
            ? validationData.title?.text
            : undefined}
        </div>
      </label>
      <label
        className={classNames('forum-input', 'forum-form__input', {
          'forum-input_invalid': validationData.text?.isValid === false,
        })}>
        <span className="forum-input__label">Сообщение темы</span>
        <textarea
          className="forum-input__textarea"
          value={text}
          maxLength={2000}
          onChange={e => {
            clearFieldValidation('text');
            validateField('text', e.currentTarget.value);
            setText(e.currentTarget.value);
          }}
          onBlur={() => {
            validateField('text', text);
          }}
        />
        <div
          className="forum-input__validation"
          title={
            validationData.text?.isValid === false
              ? validationData.text?.text
              : undefined
          }>
          {validationData.text?.isValid === false
            ? validationData.text?.text
            : undefined}
        </div>
      </label>
      <div className="forum-form__footer">
        <button
          type="button"
          className="forum-form__button"
          onClick={onCreateThemeButtonClick}
          disabled={!isFormValid}>
          Создать тему
        </button>
      </div>
    </div>
  );
};

export default ForumEditPostForm;
