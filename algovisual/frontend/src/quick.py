import random
import matplotlib.pyplot as plt
import matplotlib.animation as animation
def quicksort(arr, low, high, ax, bars, interval):
    if low < high:
        pi = partition(arr, low, high, ax, bars, interval)
        quicksort(arr, low, pi - 1, ax, bars, interval)
        quicksort(arr, pi + 1, high, ax, bars, interval)
def partition(arr, low, high, ax, bars, interval):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            update_bars(arr, ax, bars)
            plt.pause(interval)
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    update_bars(arr, ax, bars)
    plt.pause(interval)
    return i + 1
def update_bars(arr, ax, bars):
    for bar, height in zip(bars, arr):
        bar.set_height(height)
    ax.set_title("QuickSort Visualization")
def init_plot():
    arr = random.sample(range(10, 100), 5)
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.set_title("QuickSort Visualization")
    ax.set_ylim(0, 100)
    bars = ax.bar(range(len(arr)), arr, color="skyblue")
    return arr, ax, bars, fig
def animate_quick_sort():
    arr, ax, bars, fig = init_plot()
    interval = 0.5 
    quicksort(arr, 0, len(arr) - 1, ax, bars, interval)
    plt.show()
animate_quick_sort()