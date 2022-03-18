const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
  {
    id: 1,
    nome: "Bulbasaur",
    descricao:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    tipo: "grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  },
  {
    id: 2,
    nome: "Charmander",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    tipo: "fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
  },
  {
    id: 3,
    nome: "Squirtle",
    descricao:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    tipo: "water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
  },
  {
    id: 4,
    nome: "Pikachu",
    descricao:
      "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    tipo: "Electric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
  },
];
let pokemon = undefined;
//rotas
app.get("/", (req, res) => {
  res.render("index", { pokedex, pokemon  });
});

app.post("/cadastro", (req, res) => {
   pokemon = req.body;
  pokemon.id = pokedex.length +1;
  pokedex.push(pokemon)
  pokemon=undefined;
  res.redirect("/#cards");
});
app.get("/detalhes/:id",(req, res) =>{
  const id = +req.params.id;
  pokemon =  pokedex.find(pokemon => pokemon.id == id);
  res.redirect("/#cadastro");
})
app.post("/atualizar/:id", (req, res) =>{
  const id = +req.params.id -1;
 const newPokemon = req.body;
 newPokemon.id=id+1;
 pokedex[id] = newPokemon;
 pokemon = undefined;
 res.redirect("/#cards");
})
app.get("/deletar/:id", (req, res) =>{
  const id = +req.params.id -1;
  delete pokedex[id];
  pokemon=undefined;
  res.redirect("/#cards");
})

app.listen(3000, () =>
  console.log(`servidor rodando em: http://localhost:3000`)
);
