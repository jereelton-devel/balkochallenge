
# Recursos do sistema

def response_generator(status, message, response_name="", response_content="", request_name="", request_content=""):
    response = {"status": status, "message": message}

    if response_name != "" and response_content != "":
        response[response_name] = response_content

    if request_name != "" and request_content != "":
        response[request_name] = request_content

    return response


def sum_interval(lst):
    xsum = 0

    for x in lst:
        xsum = xsum + x[1]

    return xsum


def check_parameters(params):
    error1 = "Request Error: expected {A:[[0,n],[1,n]],K:n, L:n}"
    error2 = "Request Error: A Not Found, expected A:[[0,n]]"
    error3 = "Request Error: K Not Found, expected K:n"
    error4 = "Request Error: L Not Found, expected L:n"

    try:
        if len(params) != 3:
            return response_generator(400, error1, "response", "Error", "request", params)

        if "A" not in params or not params['A'] or type(params['A']) is not list:
            return response_generator(400, error2, "response", "Error", "request", params)

        if "K" not in params or not params['K']:
            return response_generator(400, error3, "response", "Error", "request", params)

        if "L" not in params or not params['L']:
            return response_generator(400, error4, "response", "Error", "request", params)

        for i in list(params):

            for n in range(0, len(params[i])):

                idx1 = params[i][n][0]
                idx2 = params[i][n][1]

                if type(idx1) is not int or idx1 == "" or type(idx2) is not int or idx2 == "":
                    return response_generator(400, error1, "response", "Error", "request", params)

            break

    except NameError:
        return response_generator(400, "Exception: Expected{A:[],K:n, L:n}", "", "", "request", params)

    return False


def get_max_number(p1, p2):

    if p1 > p2:
        return p1

    return p2


def calc_max_apple(vector, p1, p2, idx):
    save_total = 0

    # Variaveis de P1
    index_p1 = idx
    sum_value_p1 = 0
    higher_number_p1 = 0
    vector_save_p1 = []
    save_ini_p1 = 0
    save_end_p1 = 0

    # Primeiro Parametro
    while index_p1 < len(vector):

        # Aqui temos a primeira faixa do vetor com arvores X maças
        # Sendo iterada pelos valores de index_p1 e p1+index_p1, ou seja
        # se index_p1 = 0 e p1 = 3, então temos uma faixa de range no vetor 0, 3
        # vetor(0, 3) = [[0, 3], [1, 4], [2, 1]]
        # Apos a iteração no loop, index_p1 = 1 e p1+index_p1 = 4, ou seja, 1,4
        # Isso se repete até que  p1+index_p1 se torne maior que o tamanho do vetor
        tmp_list = vector[index_p1:p1+index_p1]

        # A variavel tmp_list contem o range obtido acima, e nessa faixa é feita
        # a contagem de cada item com o intuito em obter a quantidade de maças
        # em cada item/arvore, por exemplo:
        # vetor(0, 3) = [[0, 3], [1, 4], [2, 1]] => 3+4+1 = 8
        # Ao final de cada iteração desse loop temos o valor da soma de cada faixa do
        # range, o qual sera comparado logo em seguida em busca do maior numero possivel
        for item in tmp_list:
            tmp_value = item[1]
            sum_value_p1 = sum_value_p1 + tmp_value

        # Aqui iniciar a comparação em busca do maior numero, assim como o armazenamento
        # de cada resultado com seu respectivo range(onde foi encontrado) e dois inteiros
        # tambem indicando onde inicia e finaliza essa faixa de range
        # Outro ponto a comentar, é que o vetor vector_save é populado/indexado pelo valor
        # do maior numero e seu range de referencia, sendo ordenado e revertido, tendo
        # tendo como resultado final um vetor ordenado do maior para o menor
        higher_number_p1 = get_max_number(sum_value_p1, higher_number_p1)
        vector_save_p1.append([sum_value_p1, tmp_list])
        vector_save_p1.sort()
        vector_save_p1.reverse()
        save_ini_p1 = vector_save_p1[0][1][0][0]
        save_end_p1 = vector_save_p1[0][1][p1-1][0]
        # O incremento de index_p1 serve para continuar a varredura no vetor
        # e o zerar da variavel sum_value serve para contar os valores do proximo range
        index_p1 = index_p1 + 1
        sum_value_p1 = 0

        # Essa condição faz com que o contador não ultrapasse o tamanho permitido para
        # contabilizar os valores do vetor alvo, ou seja, se o vetor tem um tamanho 6
        # e o p1 = 3 e o index_p1 esta com o valor 4, então temos p1+index_p1 = 7, sendo
        # assim não existem mais posições validas no vetor que atendam a condição de sequencia
        # requerida para contar os valores
        if p1+index_p1 > len(vector):
            break

    # Nesse ponto a variavel save_total armazena apenas a soma do range encontrado com o maior
    # numero referente ao p1 (parametro 1 ou pessoa 1)
    save_total = save_total + higher_number_p1

    # Variaveis de P2
    index_p2 = 0
    sum_value_p2 = 0
    higher_number_p2 = 0
    vector_save_p2 = []
    save_ini_p2 = 0
    save_end_p2 = 0

    # Segundo Parametro
    while index_p2 <= len(vector):

        # Mesma lógica do algoritimo anterior
        if p2+index_p2 > len(vector):
            break

        # Aqui esta a condição de controle para que o fluxo atual da colheita
        # não utilize posições já usadas pelo algoritimo anterior, como uma forma
        # de garantir que não ocorra sobreposição de dados
        if (save_ini_p1 <= index_p2 <= save_end_p1) or (save_ini_p1 <= (p2+index_p2-1) <= save_end_p1):
            index_p2 = index_p2 + 1
            continue

        # Abaixo temos a mesma lógica do algoritimo acima com a diferença de
        # que agora temos consições de iteração, posição e dados com valore diferentes
        tmp_list = vector[index_p2:p2+index_p2]

        for item in tmp_list:
            tmp_value = item[1]
            sum_value_p2 = sum_value_p2 + tmp_value

        vector_save_p2.append([sum_value_p2, tmp_list])
        vector_save_p2.sort()
        vector_save_p2.reverse()
        save_ini_p2 = vector_save_p2[0][1][0][0]
        save_end_p2 = vector_save_p2[0][1][p2-1][0]

        # Comparador de maior numero encontrado no range atual
        higher_number_p2 = get_max_number(sum_value_p2, higher_number_p2)
        index_p2 = index_p2 + 1
        sum_value_p2 = 0

    # Agora temos a soma final referente a quantidade de maças em todas as posições
    # encontradas pelo algoritimo
    save_total = save_total + higher_number_p2

    # Aqui é verificado se o processo ocorreu como esperado, sendo que ambos vetores p1 2 p2
    # precisam estar populados, caso contrario uma falha ocorreu e precisa ser "corrigida"
    if len(vector_save_p2) == 0:
        print("Ops! Tentando novamente...")
        idx = idx + 1
        return calc_max_apple(vector, p1, p2, idx)

    else:
        # O retorno é composto pelo total de maças encontradas, o range de p1, O range de p2
        # assim como suas posições iniciais e finais, como uma forma de auxiliar na manipulação
        # do resultado pelo consumidor
        rsp = [
            save_total,
            ["p1", vector_save_p1[0]],
            ["p2", vector_save_p2[0]],
            ["p1_ini", save_ini_p1],
            ["p1_end", save_end_p1],
            ["p2_ini", save_ini_p2],
            ["p2_end", save_end_p2]
        ]

    return rsp
