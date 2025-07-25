import numpy as np

def ReLU(X):
    assert isinstance(X, np.ndarray), "ReLU(arg1): arg1 parameter should be of type numpy.array"
    return np.maximum(0, X)

def dRelu(X):
    assert isinstance(X, np.ndarray), "ReLU(arg1): arg1 parameter should be of type numpy.array"
    return X>0