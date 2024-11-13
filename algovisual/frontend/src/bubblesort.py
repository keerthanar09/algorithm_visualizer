import random
import matplotlib.pyplot as plt
import matplotlib.animation as animation


arr = [random.randint(1, 100) for _ in range(5)]


fig, ax = plt.subplots()
bars = ax.bar(range(len(arr)), arr, color='skyblue')


ax.set_ylim(0, 120)


def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            yield arr, j, j+1 
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]  


def update(frame):
    arr, i, j = frame
    for rect, h in zip(bars, arr):
        rect.set_height(h)  

    
    for bar in bars:
        bar.set_color('skyblue')
    bars[i].set_color('red')
    bars[j].set_color('red')
    
    return bars


bubble_gen = bubble_sort(arr)


ani = animation.FuncAnimation(fig, update, frames=bubble_gen, interval=500, repeat=False)

plt.title("Bubble Sort Visualizer")
plt.show()