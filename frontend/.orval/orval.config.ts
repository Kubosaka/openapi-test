export default  {
  "petstore-file": {
    input: "../../openapi/openapi.yml",
    output: {
      target: "../generated",
      mode: "tags-split",
      schemas: "../generated",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: 'http://localhost:8080',
    },
  },
};

