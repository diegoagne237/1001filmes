-- Rode isto DEPOIS do schema.sql, no mesmo SQL Editor.
-- Popula o catálogo com os 8 filmes de exemplo (os mesmos que estavam em src/data/movies.js).
-- Quando formos importar a lista completa dos 1001, é o mesmo formato de insert.

insert into movies (id, ficha, title, original_title, year, director, country, genre, decade, synopsis)
values
  ('o-setimo-selo-1957', 42, 'O Sétimo Selo', 'Det sjunde inseglet', 1957, 'Ingmar Bergman', 'Suécia', 'Drama', 1950,
   'Um cavaleiro recém-chegado das Cruzadas desafia a Morte para uma partida de xadrez, tentando adiar seu destino enquanto atravessa uma terra assolada pela peste.'),

  ('chinatown-1974', 117, 'Chinatown', 'Chinatown', 1974, 'Roman Polanski', 'EUA', 'Noir', 1970,
   'Um detetive particular em Los Angeles é contratado para investigar um caso de adultério que revela uma conspiração muito maior envolvendo água, poder e corrupção.'),

  ('dr-fantastico-1964', 233, 'Dr. Fantástico', 'Dr. Strangelove', 1964, 'Stanley Kubrick', 'Reino Unido', 'Comédia', 1960,
   'Uma sátira sobre a Guerra Fria em que um general americano desencadeia um ataque nuclear não autorizado, forçando líderes e militares a uma corrida contra o apocalipse.'),

  ('ran-1985', 301, 'Ran', '乱', 1985, 'Akira Kurosawa', 'Japão', 'Épico', 1980,
   'Um antigo senhor feudal divide seu território entre os três filhos, desencadeando uma guerra fratricida que destrói tudo o que construiu.'),

  ('o-silencio-dos-inocentes-1991', 459, 'O Silêncio dos Inocentes', 'The Silence of the Lambs', 1991, 'Jonathan Demme', 'EUA', 'Suspense', 1990,
   'Uma agente do FBI em treinamento busca a ajuda de um psiquiatra canibal preso para capturar outro assassino em série ainda em atividade.'),

  ('central-do-brasil-1998', 512, 'Central do Brasil', 'Central do Brasil', 1998, 'Walter Salles', 'Brasil', 'Drama', 1990,
   'Uma ex-professora que escreve cartas para analfabetos na Central do Brasil se vê obrigada a acompanhar um menino em busca do pai que nunca conheceu.'),

  ('cidade-de-deus-2001', 688, 'Cidade de Deus', 'Cidade de Deus', 2001, 'Fernando Meirelles', 'Brasil', 'Drama', 2000,
   'A trajetória de crianças e jovens na favela Cidade de Deus, no Rio de Janeiro, ao longo de três décadas marcadas pela violência do crime organizado.'),

  ('boyhood-2014', 777, 'Boyhood', 'Boyhood', 2014, 'Richard Linklater', 'EUA', 'Drama', 2010,
   'Filmado ao longo de 12 anos com o mesmo elenco, acompanha o crescimento de um garoto do Texas da infância até a entrada na faculdade.')

on conflict (id) do nothing;
