import axios from 'axios';

export default (route, data = {}, method = 'get', config) => {

  const promise = new Promise(async (resolve, reject) => {
    try {
      const hasData = ['post', 'put', 'delete'].includes(method);

      const params = hasData
        ? method === 'delete'
          ? {data}
          : data
        : {params: data};

      const res = hasData
        ? await axios[method](route, params, {...config})
        : await axios[method](route, {...params, ...config});

      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });

  return promise;
};
