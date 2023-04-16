import random
from collections import namedtuple
import copy
import time


class GameOfLife:
    def __init__(self):
        self.GRID_HEIGHT = 80
        self.GRID_WIDTH = 80
        self.EMPTYCELL = 0
        self.FULLCELL = 1
        self.STABILITY_THRESHOLD = 10

        self.Coordinates = namedtuple('Coordinates', ['row', 'column'])

    def create_grid(self) -> list:
        grid = [[self.FULLCELL if random.randint(1, 5) == 1 else self.EMPTYCELL
                for _column in range(self.GRID_WIDTH)]
                for _row in range(self.GRID_HEIGHT)]
        return grid

    def count_cells(self, grid, head_cell_row=None, head_cell_column=None) -> int:
        if head_cell_row is None or head_cell_column is None:
            return sum(1 for row in range(self.GRID_HEIGHT)
                       for column in range(self.GRID_WIDTH)
                       if grid[row][column] == self.FULLCELL)

        current_coordinates = self.Coordinates(
            row=head_cell_row, column=head_cell_column)
        return sum(1 for row in range(current_coordinates.row - 1, current_coordinates.row + 2)
                   for column in range(current_coordinates.column - 1, current_coordinates.column + 2)
                   if self.valid_neighbour(grid, row, column, current_coordinates.row, current_coordinates.column))

    def valid_neighbour(self, grid, row, column, head_cell_row, head_cell_column) -> bool:
        current_coordinates = self.Coordinates(
            row=head_cell_row, column=head_cell_column)

        return (
            self.in_grid(row, column) and
            not (row == current_coordinates.row and column == current_coordinates.column) and
            grid[row][column] == self.FULLCELL
        )

    def in_grid(self, row, column) -> bool:
        return (
            (row >= 0) & (row < self.GRID_HEIGHT) &
            (column >= 0) & (column < self.GRID_WIDTH)
        )

    def update_grid(self, grid) -> list:  # updates the grid for every tic by one generation
        temporary_grid: list = copy.deepcopy(grid)

        for row in range(self.GRID_HEIGHT):
            for column in range(self.GRID_WIDTH):
                current_coordinates = self.Coordinates(row=row, column=column)

                # cell_count number of neighbours for each cell
                numOfNeighbours: int = self.count_cells(
                    temporary_grid, current_coordinates.row, current_coordinates.column)

                if temporary_grid[current_coordinates.row][current_coordinates.column] == self.FULLCELL:
                    # delete cell if cell has less than 2 neighbors or more than 3 neighbors
                    if (numOfNeighbours) < 2 or (numOfNeighbours > 3):
                        grid[current_coordinates.row][current_coordinates.column] = self.EMPTYCELL
                else:
                    if numOfNeighbours == 3:  # make new cell if empty cell has 3 neighbours
                        grid[current_coordinates.row][current_coordinates.column] = self.FULLCELL

        return grid

    def count_all_cells(self, grid) -> int:
        return sum(1 for row in range(self.GRID_HEIGHT)
                   for column in range(self.GRID_WIDTH)
                   if grid[row][column] == self.FULLCELL)

    def grid_state_in_history(self, grid, history):
        return any(grid == past_grid for past_grid in history)