function index(request, response) {
  response.status(200).json({"texto": "alunos do curso.dev são pessoas acima da média"})
}

export default index;