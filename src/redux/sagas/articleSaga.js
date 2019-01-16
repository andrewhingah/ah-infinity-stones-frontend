import { put, takeLatest, call } from 'redux-saga/effects';
import {
  createArticleSuccessAction, createArticleFailureAction,
  getAllArticlesSuccessAction, getAllArticlesFailureAction,
  getOneArticleSuccessAction, getOneArticleFailureAction,
} from '../actions/articleActions';
import {
  CREATE_ARTICLE, GET_ALL_ARTICLES_REQUEST, GET_ONE_ARTICLE_REQUEST, UPDATE_ARTICLE, DELETE_ARTICLE,
} from '../actions/actionTypes';
import {
  createArticle, getAllArticles, getOneArticle, updateArticle, deleteArticle,
} from '../../services/articlePayload';

function* createArticleSaga(action) {
  try {
    const response = yield call(createArticle, action.payload);
    if (response.art_slug) {
      yield put(createArticleSuccessAction(response));
    } else {
      yield put(createArticleFailureAction(response));
    }
  } catch (e) {
    return (e.response);
  }
}

/**
 * The generator watches the createArticleSaga for event.
 */
export function* watchCreateArticleSaga() {
  yield takeLatest(CREATE_ARTICLE, createArticleSaga);
}

function* getAllArticlesSaga() {
  try {
    const response = yield call(getAllArticles);
    if (response[0].status === 200) {
      yield put(getAllArticlesSuccessAction(response[1]));
    } else {
      yield put(getAllArticlesFailureAction(response[0].error));
    }
  } catch (e) {
    return e;
  }
}
/**
 * The generator watches the getAllArticlesSaga for event.
 */
export function* watchGetAllArticlesSaga() {
  yield takeLatest(GET_ALL_ARTICLES_REQUEST, getAllArticlesSaga);
}

function* getOneArticleSaga(action) {
  try {
    const response = yield call(getOneArticle, action.payload);
    if (response[0].status === 200) {
      yield put(getOneArticleSuccessAction(response[1]));
    } else {
      yield put(getOneArticleFailureAction(response[0].error));
    }
  } catch (e) {
    console.log(e);
  }
}
/**
 * The generator watches the getAllArticlesSaga for event.
 */
export function* watchGetOneArticleSaga() {
  yield takeLatest(GET_ONE_ARTICLE_REQUEST, getOneArticleSaga);
}

function* updateArticleSaga(action) {
  try {
    const response = yield call(updateArticle, action.payload);
    if (response.message === 'article updated successfully') {
      return response.message;
    }
    return response.error;
  } catch (e) {
    return (e);
  }
}
/**
 * The generator watches the editArticleSaga for event.
 */
export function* watchUpdateArticleSaga() {
  yield takeLatest(UPDATE_ARTICLE, updateArticleSaga);
}


function* deleteArticleSaga(action) {
  try {
    yield call(deleteArticle, action.payload);
  } catch (e) {
    console.log(e);
  }
}
/**
 * The generator watches the deleteArticleSaga for event.
 */
export function* watchDeleteArticleSaga() {
  yield takeLatest(DELETE_ARTICLE, deleteArticleSaga);
}
