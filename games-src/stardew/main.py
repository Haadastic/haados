import asyncio
import pygame, sys
from settings import *
from level import Level

class Game:
	def __init__(self):
		# Larger mixer buffer = fewer audio dropouts/crackle in the browser.
		try:
			pygame.mixer.pre_init(44100, -16, 2, 1024)
		except pygame.error:
			pass
		pygame.init()
		self.screen = pygame.display.set_mode((SCREEN_WIDTH,SCREEN_HEIGHT))
		pygame.display.set_caption('Sprout land')
		self.clock = pygame.time.Clock()
		self.level = Level()

	async def run(self):
		while True:
			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					pygame.quit()
					sys.exit()

			dt = self.clock.tick(60) / 1000
			self.level.run(dt)
			pygame.display.update()
			await asyncio.sleep(0)

async def main():
	game = Game()
	await game.run()

asyncio.run(main())
