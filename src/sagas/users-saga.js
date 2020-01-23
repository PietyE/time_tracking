import { takeEvery, put, call, take } from "redux-saga/effects";

// import { fetchApi } from "utils/fetchApi";
import { setUsersOauthData, cleanUserOauthData } from "actions/users";
import { showAler } from "actions/alert";
import { LOG_IN, LOG_OUT, BOOTSTRAP } from "constants/actions-constant";
import { DANGER_ALERT, WARNING_ALERT } from "constants/alert-constant";

function* bootstrap() {
  try {
    const user_auth_data = yield call(
      [localStorage, "getItem"],
      "user_auth_data"
    );

    if (user_auth_data) {
      const data_user = JSON.parse(user_auth_data);
      const { access_token, expires_at } = data_user;
      const nowTime = new Date().getTime();

      if (access_token && expires_at && nowTime < expires_at) {
        yield put(setUsersOauthData(data_user));
        return true;
      }
      return false;
    } else {
      return false;
    }
  } catch (error) {
    yield put(
      showAler({
        type: DANGER_ALERT,
        message: "Something went wrong",
        delay: 5000
      })
    );
  }
}

function* logIn(data) {
  try {
    if (typeof data === "object" && data) {
      if (data.error) {
        throw new Error(data.error);
      }
      const userObj = {
        ...data.profileObj,
        ...data.tokenObj
      };
      const userObjString = JSON.stringify(userObj);
      yield put(setUsersOauthData(userObj));
      yield call([localStorage, "setItem"], "user_auth_data", userObjString);
      return userObj.access_token;
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: "Something went wrong",
        message: error.message || "Something went wrong",
        delay: 6000
      })
    );
  }
}

function* logOut() {
  try {
    yield put(cleanUserOauthData());
    yield call([localStorage, "clear"]);
    console.log("logOut");
  } catch (error) {
    yield put(
      showAler({
        type: DANGER_ALERT,
        message: "Something went wrong",
        delay: 3000
      })
    );
  }
}

export function* watchGetUserAsync() {
  while (true) {
    yield take(BOOTSTRAP);
    const isAuth = yield call(bootstrap);

    if (isAuth) {
      yield take(LOG_OUT);

      yield call(logOut);
    } else {
      const { payload } = yield take(LOG_IN);

      const access_token = yield call(logIn, payload);
      if (access_token) {
        yield take(LOG_OUT);

        yield call(logOut);
      }
    }
  }
}
