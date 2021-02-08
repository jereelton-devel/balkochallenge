> SOBRE

* Esse projeto foi criado para tentar resolver um problema probabílistico relacionado a um desafio feito por uma empresa de software:

<pre>
Duas pessoas, Marcelo e Carla, trabalham em uma fazenda de maçãs na qual existem N árvores. As
árvores estão alinhadas em uma fileira e são numeradas de 1 a N. Marcelo planeja coletar maçãs de
K árvores consecutivas e Carla de L árvores consecutivas. Eles querem escolher segmentos
disjuntos, ou seja, que não se sobrepõem para não interferirem na coleta do outro. Qual o maior
número de maçãs que os dois juntos podem coletar?

Escreva uma função:

def get_max_apples(A, K, L)

que, dado um vetor A consistindo de N inteiros denotando o número de maçãs em cada árvore, e
inteiros K e L, respectivamente, o número de árvores que Marcelo e Carla escolhem coletar, retorne
o número máximo de maçãs coletadas ou -1 se não existem intervalos que permitam a coleita.
  
Por exemplo, dado um vetor A = [3, 4, 1, 7, 8, 5], K = 2, L = 3, sua função deve retornar
27, já que Carla escolherá as árvores 4, 5 e 6 e coletar 7 + 8 + 5 = 20 maçãs. Marcelo, por sua vez,
escolherá as árvores 1 e 2, coletando assim 3 + 4 = 7 maçãs.

Dado o vetor A = [1, 3, 5], K = 2, L = 2 a função deverá retornar -1, pois não existe como
Marcelo e Carla escolherem dois intervalos disjuntos de tamanho 2.
</pre>

> REQUISITOS

* Requirements.txt

* Python 3.8 (Framework Flask)

* Jquery 1.11.3
jquery / jquery: https://github.com/jquery/jquery

* Toastr 2.1.3
CodeSeven/toastr: https://github.com/CodeSeven/toastr

* Bootstrap CSS 3.3.7
twbs / bootstrap: https://github.com/twbs/bootstrap

> CONFIGURAÇÃO

* Instalar as dependências (caso necessário):

<pre>pip3 install flask</pre>
<pre>pip3 install -U flask-cors</pre>

* Ligar/Subir o serviço do servidor de desenvolvimento Python:

<pre>python3.8 server.py</pre>

* Executar o script HTML index.html em servidor web, ou direto no browser, pois o front-end não necessita de webserver, ele apenas consome o back-end.

<pre>http://localhost/balkochallenge/</pre>

* No script javascript principal configurar o endpoint /get_max_apple e as demais variaveis:
  
<pre>
  var proto = "http";
  var domain = "127.0.0.1";
  var port = ":5000";
  var endpointApi = proto+"://"+domain+port+"/get_max_apple";
</pre>

> EXEMPLOS

Um exemplo de consumo com Jquery via ajax pode ser visto abaixo:

<pre>
$.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get_max_apple",
    data: {
        "A": [[0,3],[1,4],[2,1],[3,7],[4,8],[5,5]],
        "K": 2,
        "L": 3
    },
    dataType: "json",
    contentType: 'application/json'; charset=utf-8',
    async: false,
    success: function(res) {
        console.log(res);
    },
    error: function(err, status, xhr) {
        console.error(err, status, xhr);
    }
});
</pre>

> DETALHES

* Linux [MACHINE-NAME] 5.8.0-41-generic #46~20.04.1-Ubuntu SMP Mon Jan 18 17:52:23 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
  
* Testado com navegadores Mozilla Firefox, Google Chrome e MS Edge

* É possível realizar testes utilizando o endpoint http://127.0.0.1:5000/get_max_apple informando no corpo da requisição os parametros referidos acima.

* O teste via tela (front-end) pode ser feito automaticamente e indefinidamente pelo botão [Testar] e encerrado pelo botão [Encerrar]
