from source import *


def get_max_apple(vector, p1, p2):
    vector_size = len(vector)

    if p1 + p2 > vector_size:
        return -1

    if (p1 + p2) == vector_size:
        if p1 > p2:
            rkt = sum_interval(vector[0:p1])
            rlt = sum_interval(vector[p1:vector_size])
            return [
                rkt + rlt,
                ["p1", vector[0:p1]],
                ["p2", vector[p1:vector_size]],
                ["p1_ini", 0],
                ["p1_end", p1-1],
                ["p2_ini", p1],
                ["p2_end", vector_size-1]
            ]
        else:
            rkt = sum_interval(vector[0:p2])
            rlt = sum_interval(vector[p2:vector_size])
            return [
                rkt + rlt,
                ["p2", vector[0:p2]],
                ["p1", vector[p2:vector_size]],
                ["p1_ini", p2],
                ["p1_end", vector_size-1],
                ["p2_ini", 0],
                ["p2_end", p2-1]
            ]

    if p1 > p2:
        rf = calc_max_apple(vector, p1, p2, 0)
    else:
        rf = calc_max_apple(vector, p2, p1, 0)

    return rf


# lst = [[0,3],[1,4],[2,1],[3,7],[4,8],[5,5]]
# test = get_max_apple(lst, 2, 3)
# print(test)
