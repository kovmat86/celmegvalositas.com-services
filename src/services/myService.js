const Service = {
  urlPattern: "/myService",

  type: "post",

  run: (req, res) => {
    return { response: "myService works!" };
  }
};

export { Service };
export default Service;
