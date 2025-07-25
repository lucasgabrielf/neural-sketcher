import numpy as np
from numpy.random import default_rng
from activations.ReLU import ReLU, dRelu

class FeedForward:
    def __init__(self, shape):
        """
        -> shape[0] = input layer size
        -> shape[-1] = outpur layer size

        W é a matriz de weights entre cada camada
        L é a matrix de neurônios em cada camada
        B é o vetor de viés de cada neuronio

        L[-1] = final output
        """
        self.L = [default_rng(42).random(i) for i in shape]
        self.W = []
        self.B = []
        for l in range(len(shape)-1):
            if l>0:
                self.B.append(default_rng(42).random(shape[l]))
            self.W.append(default_rng(42).random((shape[l], shape[l+1])))
        self.B.append(default_rng(42).random(shape[-1]))

        # ! Acessar pesos associados ao neuronio j da camada i: W[i][j]
        # ! Acessar viés associados ao neuronio j da camada i: B[i][j]

    def forward_pass(self, x_data):
        updates = []
        An = x_data
        for i in range(len(self.W)):
            Zn = np.dot(An, self.W[i])+self.B[i]
            An = ReLU(Zn)
            updates.append((Zn, An))
        return updates

    def backpropagation(self, x_data, y_data):
        
        return

x = FeedForward((2, 3, 2))
print(x.forward_pass(default_rng(42).random((1, 2))))
