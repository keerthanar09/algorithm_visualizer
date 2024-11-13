import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# Merge Sort Algorithm
def merge_sort(arr, left, right, bars, ax):
    if left < right:
        mid = (left + right) // 2
        merge_sort(arr, left, mid, bars, ax)
        merge_sort(arr, mid + 1, right, bars, ax)
        merge(arr, left, mid, right, bars, ax)

# Merging two halves of the array
def merge(arr, left, mid, right, bars, ax):
    i = left
    j = mid + 1
    k = left
    temp_arr = arr.copy()
    
    while i <= mid and j <= right:
        if arr[i] <= arr[j]:
            temp_arr[k] = arr[i]
            i += 1
        else:
            temp_arr[k] = arr[j]
            j += 1
        k += 1

    while i <= mid:
        temp_arr[k] = arr[i]
        i += 1
        k += 1

    while j <= right:
        temp_arr[k] = arr[j]
        j += 1
        k += 1

    for i in range(left, right + 1):
        arr[i] = temp_arr[i]
    
    # Update the bars to reflect the current state of the array
    for rect, h in zip(bars, arr):
        rect.set_height(h)
    
    ax.set_title(f"Merge Sort: {arr}")
    plt.draw()

# Set up the figure and axis for the plot
fig, ax = plt.subplots(figsize=(8, 6))
ax.set_xlim(-0.5, 4.5)
ax.set_ylim(0, 10)

# Generate 5 random values between 1 and 10
arr = np.random.randint(1, 11, size=5)
bars = ax.bar(range(len(arr)), arr)

# Create the animation
def animate(i):
    merge_sort(arr, 0, len(arr) - 1, bars, ax)

ani = FuncAnimation(fig, animate, frames=1, repeat=False, interval=2000)

# Display the plot
plt.show()