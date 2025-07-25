import numpy as np
from activations.ReLU import ReLU, dRelu

x = np.array([1, -2, 3])
y = np.array([1, 2, 3])
y = y.reshape((3, 1))
print(np.dot(dRelu(x), y))
