#!/usr/bin/env python3

import pandas as pd
import matplotlib.pyplot as plt

def plot_stage1():
    df11 = pd.read_csv("11.txt", delimiter=',')
    df13 = pd.read_csv("13.txt", delimiter=',')
    df15 = pd.read_csv("15.txt", delimiter=',')

    mean11 = df11["b"]
    threads11 = df11["a"]
    mean13 = df13["b"]
    threads13 = df13["a"]
    mean15 = df15["b"]
    threads15 = df15["a"]

    plt.figure(1)
    plt.plot(threads11, mean11, 'b', label='1 Container')
    plt.plot(threads13, mean13, 'g', label='3 Container')
    plt.plot(threads15, mean15, 'r', label='5 Container')
    plt.title("Stage 1")
    plt.ylabel("mean")
    plt.xlabel("threads")
    plt.legend()




def plot_stage2():

    df21 = pd.read_csv("21.txt", delimiter=',')
    df23 = pd.read_csv("23.txt", delimiter=',')
    df25 = pd.read_csv("25.txt", delimiter=',')

    mean21 = df21["b"]
    threads21 = df21["a"]
    mean23 = df23["b"]
    threads23 = df23["a"]
    mean25 = df25["b"]
    threads25 = df25["a"]

    plt.figure(2)
    plt.plot(threads21, mean21, 'b', label='1 Container')
    plt.plot(threads23, mean23, 'g', label='3 Container')
    plt.plot(threads25, mean25, 'r', label='5 Container')
    plt.title("Stage 2")
    plt.ylabel("mean")
    plt.xlabel("threads")
    plt.legend()


def main():

    plot_stage1()
    plot_stage2()
    plt.show()

if __name__ == "__main__":
    main()
