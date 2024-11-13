import random
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# Generate 5 random unsorted values
arr = [random.randint(1, 100) for _ in range(5)]

# Set up the figure and axis
fig, ax = plt.subplots()
bars = ax.bar(range(len(arr)), arr, color='skyblue')

# Set the axis limits
ax.set_ylim(0, 120)

# BubbleSort function with animation updates
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            yield arr, j, j+1  # Yield current state and the indices being compared
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]  # Swap the values

# Update function for the animation
def update(frame):
    arr, i, j = frame
    for rect, h in zip(bars, arr):
        rect.set_height(h)  # Update the height of each bar

    # Change color to indicate comparison
    for bar in bars:
        bar.set_color('skyblue')
    bars[i].set_color('red')
    bars[j].set_color('red')
    
    return bars

# Create the BubbleSort generator
bubble_gen = bubble_sort(arr)

# Create the animation
ani = animation.FuncAnimation(fig, update, frames=bubble_gen, interval=500, repeat=False)

plt.title("Bubble Sort Visualizer")
plt.show()