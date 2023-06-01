getRequest({ videoId: videoId, responseType: 'blob' }, undefined, token, end)
    .then((response) => {
      console.log(response.headers)
      download(response.data, response.headers["filename"], response.headers.getContentType)
      notification.success({ message: "Note Downloaded" })
    }).catch((err) => {
      notification.error({ message: err?.response?.data?.message })
      console.log(err);
    });