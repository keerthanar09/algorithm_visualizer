import pygame
import random
import time

pygame.init()
WIDTH = 600
HEIGHT = 400
BAR_WIDTH = 80
FPS = 10
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Selection Sort Visualizer")

WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
BACKGROUND_COLOR = WHITE  

def draw_bars(arr, highlight=None):
    screen.fill(BACKGROUND_COLOR)  
    for i, val in enumerate(arr):
        color = BLUE if i != highlight else RED
        pygame.draw.rect(screen, color, (i * (BAR_WIDTH + 10), HEIGHT - val * 50, BAR_WIDTH, val * 50))
    pygame.display.update()
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
            draw_bars(arr, highlight=j)  
            pygame.time.delay(1000)  
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        draw_bars(arr, highlight=i) 
        pygame.time.delay(1000) 


def main():
    arr = random.sample(range(1, 9), 5)
    
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        draw_bars(arr)
        pygame.time.delay(1000)

        selection_sort(arr)

        time.sleep(2)
        running = False

    pygame.quit()

if __name__ == "__main__":
    main()