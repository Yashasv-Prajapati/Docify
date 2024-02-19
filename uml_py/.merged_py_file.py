# Content from: ./.merged_py_file.py


# Content from: ./Docify-Combiner.py
import os
FINAL = "."
def copy_py_files(directory, output_file):
    with open(output_file, 'w') as output:
        for root, _, files in os.walk(directory):
            for filename in sorted(files):
                if filename.endswith(".py") and filename != "Dockify-Combiner.py":
                    file_path = os.path.join(root, filename)
                    print(file_path)
                    with open(file_path, 'r') as file:
                        output.write("# Content from: {}\n".format(file_path))
                        output.write(file.read())
                        output.write("\n\n")
                        

                        
def list_folders_and_files():
    """
    Lists all folders and files in the current directory.
    """
    items = os.listdir()
    folders = [item for item in items if os.path.isdir(item)]
    files = [item for item in items if os.path.isfile(item)]
    return folders, files

def navigate():
    """
    Allows the user to navigate through folders and files.
    """
    global FINAL
    while True:
        print("\nCurrent Directory Contents:")
        folders, files = list_folders_and_files()
        print("Folders:")
        for folder in folders:
            print(folder + "/")
        print("\nFiles:")
        for file in files:
            print(file)
        
        choice = input("\nEnter folder or file name to navigate (or press Enter to exit): ")
        if choice == "":
            # return os.path.abspath(choice)
            break
        elif os.path.isdir(choice):
            os.chdir(choice)
        elif os.path.isfile(choice):
            return os.path.abspath(choice)
        else:
            print("Invalid choice. Please enter a valid folder or file name.")


def main():
    # source_directory = input("Enter directory name (. for current directory): \n") 
    output_file = ".merged_py_file.py"
    # source_directory = navigate()
    source_directory = "."

    copy_py_files(source_directory, output_file)
    print("All .py files copied to {}".format(output_file))

if __name__ == "__main__":
    main()


# Content from: ./StepsByKnightVisualiser/knight.py
import pygame
import sys
import time

# Define the colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
COLORS = [
	(255, 0, 0),    # Red
	(0, 255, 0),    # Green
	(0, 0, 255),    # Blue
	(255, 255, 0),  # Yellow
	(255, 0, 255),  # Magenta
	(0, 255, 255),  # Cyan
	(128, 0, 0),    # Maroon
	(0, 128, 0),    # Green (dark)
	(0, 0, 128),    # Navy
	(128, 128, 0),  # Olive
	(128, 0, 128),  # Purple
	(0, 128, 128),  # Teal
	(128, 128, 128),  # Gray
	(192, 192, 192),  # Silver
	(255, 165, 0),  # Orange
	(210, 105, 30),  # Chocolate
	(0, 128, 128),  # Teal
	(0, 255, 127),  # Spring Green
	(255, 20, 147),  # Deep Pink
	(176, 224, 230)  # Powder Blue
]



# Define the dimensions of the chessboard
BOARD_SIZE = None
SQUARE_SIZE = 80
WINDOW_SIZE = None
window = None
font = None

def initialiseParameter():
	global window
	global font
	global WINDOW_SIZE
	# Initialize pygame
	pygame.init()
	
	# Initialize the font
	pygame.font.init()
	
	# Create a font object
	font = pygame.font.SysFont("Arial", 24)
	
	WINDOW_SIZE = (BOARD_SIZE * SQUARE_SIZE, BOARD_SIZE * SQUARE_SIZE)
	window = pygame.display.set_mode(WINDOW_SIZE)
	pygame.display.set_caption("Knight's Movement Visualizer")
	visualize_complete = False



# Function to draw the chessboard
def draw_chessboard():
	global BOARD_SIZE
	for row in range(BOARD_SIZE):
		for col in range(BOARD_SIZE):
			if (row + col) % 2 == 0:
				color = WHITE
			else:
				color = BLACK
			pygame.draw.rect(window, color, (col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE))

# Function to draw the knight at a given position
def draw_knight(position, i, ans):
	x, y = position
	pygame.draw.circle(window, COLORS[i], (y * SQUARE_SIZE + SQUARE_SIZE // 2, x * SQUARE_SIZE + SQUARE_SIZE // 2), SQUARE_SIZE // 2 - 5)
	
	# Create a text surface with the position coordinates
	if(i == 0):
		text_surface = font.render(f'S{x},{y}', True, (255 - COLORS[i][0], 255 - COLORS[i][1], 255 - COLORS[i][2]))
	elif(i == -1):
		text_surface = font.render(f'E{x},{y}', True, (255 - COLORS[i][0], 255 - COLORS[i][1], 255 - COLORS[i][2]))
	else:
		text_surface = font.render(f'{x},{y}', True, (255 - COLORS[i][0], 255 - COLORS[i][1], 255 - COLORS[i][2]))
	text_rect = text_surface.get_rect(center=(y * SQUARE_SIZE + SQUARE_SIZE // 2, x * SQUARE_SIZE + SQUARE_SIZE // 2))
	
	# Draw the text surface on the circle
	window.blit(text_surface, text_rect)

# Function to visualize the knight's movement
def visualize_movement(knight_pos, target_pos, knight_moves, count):
	draw_chessboard()
	draw_knight(knight_pos, 1, count)
	pygame.display.update()

	pygame.time.delay(2000)
	
	print(knight_moves)
	i = 1
	for move in knight_moves:
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				pygame.quit()
				sys.exit()
		if(move != None):
			draw_knight(knight_pos, i, count)
			x, y = move
			knight_pos = (x, y)  # Update the knight's position
			# pygame.draw.circle(window, COLORS[i], (y * SQUARE_SIZE + SQUARE_SIZE // 2, x * SQUARE_SIZE + SQUARE_SIZE // 2), SQUARE_SIZE // 2 - 5, width = 1)
			pygame.display.update()
			pygame.time.wait(100)
		elif (move ==None):
			# NEW_COLOR = (NEW_COLOR[0] + 10,NEW_COLOR[0] + 5, NEW_COLOR[0] - 3) 
			# print(NEW_COLOR)
			# NEW_COLOR[0] += 50
			
			
			text_surface = font.render(f"Now we are on move {i-1}", True, WHITE)
			text_rect = text_surface.get_rect(center=(WINDOW_SIZE[0] // 2, WINDOW_SIZE[1] // 2))
			background_surface = pygame.Surface((text_rect.width, text_rect.height ))
			background_surface.fill(BLACK)
			window.blit(background_surface, text_rect)
			window.blit(text_surface, text_rect)
			i+=1
			
			pygame.display.update()
			pygame.time.delay(4000)
	text_surface = font.render(f"Now we are on move {i-1}", True, WHITE)
	text_rect = text_surface.get_rect(center=(WINDOW_SIZE[0] // 2, WINDOW_SIZE[1] // 2))
	background_surface = pygame.Surface((text_rect.width, text_rect.height ))
	background_surface.fill(BLACK)
	window.blit(background_surface, text_rect)
	window.blit(text_surface, text_rect)
	# draw_chessboard()
	draw_knight(target_pos, -1, count+1)
	pygame.display.update()
	global visualize_complete
	visualize_complete = True


# Driver code
def main():
	
	global BOARD_SIZE
	BOARD_SIZE = int(input("Enter the board size: "))
	kx = int(input("Enter knight's x position(should be less than board size - 1): "))
	ky = int(input("Enter knight's y position(should be less than board size - 1): "))
	KnightPos = (kx, ky)
	# shouold be less than board size - 1
	tx = int(input("Enter target x position(should be less than board size - 1): "))
	ty = int(input("Enter target y position(should be less than board size - 1): "))
	TargetPos = (tx, ty)
	N = BOARD_SIZE
	initialiseParameter()
	

	# Algorithm to find the knight's movement
	if KnightPos[0] == TargetPos[0] and KnightPos[1] == TargetPos[1]:
		print("Knight is already at the target position.")
		return
# 
	knight_moves = []
	queue = [(KnightPos[0], KnightPos[1])]
	visited = [[False] * (N + 1) for _ in range(N + 1)]
	visited[KnightPos[0]][KnightPos[1]] = True
	ans = 0
	ax = [1, 1, -1, -1, 2, -2, 2, -2]
	ay = [2, -2, 2, -2, 1, 1, -1, -1]
	global visualize_complete
	while queue:
		visualize_complete = False
		size = len(queue)
		ans += 1
		knight_moves.append(None)
		for _ in range(size):
			front = queue.pop(0)
			# knight_moves
			for i in range(8):
				nx = front[0] + ax[i]
				ny = front[1] + ay[i]

				if nx == TargetPos[0] and ny == TargetPos[1]:
					print("Knight reached the target position in", ans, "steps.")
					visualize_movement(KnightPos, TargetPos, knight_moves, ans)
					while True:
						for event in pygame.event.get():
							if event.type == pygame.QUIT:
								pygame.quit()
								sys.exit()
					return

				if 0 <= nx <= N-1 and 0 <= ny <= N-1 and not visited[nx][ny]:
					visited[nx][ny] = True
					queue.append((nx, ny))
					knight_moves.append((nx, ny))
					

	# Wait for the window to be closed
	while True:
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				pygame.quit()
				sys.exit()
	print("Knight cannot reach the target position.")

if __name__ == "__main__":
	main()


