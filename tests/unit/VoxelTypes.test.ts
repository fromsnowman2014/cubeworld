import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  BlockType,
  BLOCK_TYPES,
  BlockData,
  VoxelPosition,
  Chunk,
  WorldSettings
} from '../../src/types/VoxelTypes';

describe('VoxelTypes', () => {
  describe('BlockType enum', () => {
    it('should have correct numeric values', () => {
      expect(BlockType.AIR).toBe(0);
      expect(BlockType.GRASS).toBe(1);
      expect(BlockType.DIRT).toBe(2);
      expect(BlockType.STONE).toBe(3);
      expect(BlockType.SAND).toBe(4);
      expect(BlockType.WATER).toBe(5);
      expect(BlockType.WOOD).toBe(6);
      expect(BlockType.LEAVES).toBe(7);
      expect(BlockType.SNOW).toBe(8);
      expect(BlockType.COBBLESTONE).toBe(9);
      expect(BlockType.BEDROCK).toBe(10);
    });

    it('should have unique values for each block type', () => {
      const values = Object.values(BlockType).filter(v => typeof v === 'number');
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });

    it('should have all block types from 0 to 10', () => {
      const numericValues = Object.values(BlockType)
        .filter(v => typeof v === 'number')
        .sort((a, b) => (a as number) - (b as number));

      expect(numericValues).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe('BLOCK_TYPES', () => {
    it('should have data for all BlockType enum values', () => {
      const blockTypeValues = Object.values(BlockType)
        .filter(v => typeof v === 'number');

      blockTypeValues.forEach(blockType => {
        expect(BLOCK_TYPES[blockType as BlockType]).toBeDefined();
      });
    });

    it('should have correct structure for each block data', () => {
      Object.values(BLOCK_TYPES).forEach((blockData: BlockData) => {
        expect(blockData).toHaveProperty('type');
        expect(blockData).toHaveProperty('name');
        expect(blockData).toHaveProperty('color');
        expect(typeof blockData.type).toBe('number');
        expect(typeof blockData.name).toBe('string');
        expect(blockData.color).toBeInstanceOf(THREE.Color);
      });
    });

    describe('AIR block', () => {
      const air = BLOCK_TYPES[BlockType.AIR];

      it('should have correct properties', () => {
        expect(air.type).toBe(BlockType.AIR);
        expect(air.name).toBe('Air');
        expect(air.transparent).toBe(true);
      });

      it('should have black color', () => {
        expect(air.color.getHex()).toBe(0x000000);
      });
    });

    describe('GRASS block', () => {
      const grass = BLOCK_TYPES[BlockType.GRASS];

      it('should have correct properties', () => {
        expect(grass.type).toBe(BlockType.GRASS);
        expect(grass.name).toBe('Grass');
        expect(grass.transparent).toBeUndefined();
      });

      it('should have green color', () => {
        expect(grass.color.getHex()).toBe(0x5da130);
      });
    });

    describe('DIRT block', () => {
      const dirt = BLOCK_TYPES[BlockType.DIRT];

      it('should have correct properties', () => {
        expect(dirt.type).toBe(BlockType.DIRT);
        expect(dirt.name).toBe('Dirt');
      });

      it('should have brown color', () => {
        expect(dirt.color.getHex()).toBe(0x8b6f47);
      });
    });

    describe('STONE block', () => {
      const stone = BLOCK_TYPES[BlockType.STONE];

      it('should have correct properties', () => {
        expect(stone.type).toBe(BlockType.STONE);
        expect(stone.name).toBe('Stone');
      });

      it('should have gray color', () => {
        expect(stone.color.getHex()).toBe(0x808080);
      });
    });

    describe('SAND block', () => {
      const sand = BLOCK_TYPES[BlockType.SAND];

      it('should have correct properties', () => {
        expect(sand.type).toBe(BlockType.SAND);
        expect(sand.name).toBe('Sand');
      });

      it('should have sandy color', () => {
        expect(sand.color.getHex()).toBe(0xf4e7c3);
      });
    });

    describe('WATER block', () => {
      const water = BLOCK_TYPES[BlockType.WATER];

      it('should have correct properties', () => {
        expect(water.type).toBe(BlockType.WATER);
        expect(water.name).toBe('Water');
        expect(water.transparent).toBe(true);
      });

      it('should have blue color', () => {
        expect(water.color.getHex()).toBe(0x3399ff);
      });
    });

    describe('WOOD block', () => {
      const wood = BLOCK_TYPES[BlockType.WOOD];

      it('should have correct properties', () => {
        expect(wood.type).toBe(BlockType.WOOD);
        expect(wood.name).toBe('Wood');
      });

      it('should have brown color', () => {
        expect(wood.color.getHex()).toBe(0x8b5a2b);
      });
    });

    describe('LEAVES block', () => {
      const leaves = BLOCK_TYPES[BlockType.LEAVES];

      it('should have correct properties', () => {
        expect(leaves.type).toBe(BlockType.LEAVES);
        expect(leaves.name).toBe('Leaves');
        expect(leaves.transparent).toBe(true);
      });

      it('should have green color', () => {
        expect(leaves.color.getHex()).toBe(0x228b22);
      });
    });

    describe('SNOW block', () => {
      const snow = BLOCK_TYPES[BlockType.SNOW];

      it('should have correct properties', () => {
        expect(snow.type).toBe(BlockType.SNOW);
        expect(snow.name).toBe('Snow');
      });

      it('should have white color', () => {
        expect(snow.color.getHex()).toBe(0xffffff);
      });
    });

    describe('COBBLESTONE block', () => {
      const cobble = BLOCK_TYPES[BlockType.COBBLESTONE];

      it('should have correct properties', () => {
        expect(cobble.type).toBe(BlockType.COBBLESTONE);
        expect(cobble.name).toBe('Cobblestone');
      });

      it('should have dark gray color', () => {
        expect(cobble.color.getHex()).toBe(0x696969);
      });
    });

    describe('BEDROCK block', () => {
      const bedrock = BLOCK_TYPES[BlockType.BEDROCK];

      it('should have correct properties', () => {
        expect(bedrock.type).toBe(BlockType.BEDROCK);
        expect(bedrock.name).toBe('Bedrock');
      });

      it('should have very dark color', () => {
        expect(bedrock.color.getHex()).toBe(0x333333);
      });
    });

    it('should have exactly 3 transparent blocks', () => {
      const transparentBlocks = Object.values(BLOCK_TYPES)
        .filter((block: BlockData) => block.transparent === true);

      expect(transparentBlocks).toHaveLength(3);
      expect(transparentBlocks.map((b: BlockData) => b.type))
        .toEqual(expect.arrayContaining([
          BlockType.AIR,
          BlockType.WATER,
          BlockType.LEAVES
        ]));
    });

    it('should have unique names for all blocks', () => {
      const names = Object.values(BLOCK_TYPES).map((block: BlockData) => block.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it('should have unique colors for most blocks', () => {
      const colors = Object.values(BLOCK_TYPES).map((block: BlockData) => block.color.getHex());
      const uniqueColors = new Set(colors);

      // Most blocks should have unique colors (some might share)
      expect(uniqueColors.size).toBeGreaterThanOrEqual(9);
    });
  });

  describe('VoxelPosition interface', () => {
    it('should accept valid position objects', () => {
      const pos: VoxelPosition = { x: 10, y: 20, z: 30 };
      expect(pos.x).toBe(10);
      expect(pos.y).toBe(20);
      expect(pos.z).toBe(30);
    });

    it('should handle negative coordinates', () => {
      const pos: VoxelPosition = { x: -5, y: -10, z: -15 };
      expect(pos.x).toBe(-5);
      expect(pos.y).toBe(-10);
      expect(pos.z).toBe(-15);
    });

    it('should handle zero coordinates', () => {
      const pos: VoxelPosition = { x: 0, y: 0, z: 0 };
      expect(pos.x).toBe(0);
      expect(pos.y).toBe(0);
      expect(pos.z).toBe(0);
    });

    it('should handle decimal coordinates', () => {
      const pos: VoxelPosition = { x: 1.5, y: 2.7, z: 3.9 };
      expect(pos.x).toBe(1.5);
      expect(pos.y).toBe(2.7);
      expect(pos.z).toBe(3.9);
    });
  });

  describe('Chunk interface', () => {
    it('should create a valid chunk with default values', () => {
      const chunkSize = 16;
      const chunkHeight = 64;
      const blocks = new Uint8Array(chunkSize * chunkHeight * chunkSize);

      const chunk: Chunk = {
        x: 0,
        z: 0,
        blocks,
        mesh: null,
      };

      expect(chunk.x).toBe(0);
      expect(chunk.z).toBe(0);
      expect(chunk.blocks).toBeInstanceOf(Uint8Array);
      expect(chunk.blocks.length).toBe(chunkSize * chunkHeight * chunkSize);
      expect(chunk.mesh).toBeNull();
    });

    it('should handle negative chunk coordinates', () => {
      const chunk: Chunk = {
        x: -2,
        z: -3,
        blocks: new Uint8Array(16 * 64 * 16),
        mesh: null,
      };

      expect(chunk.x).toBe(-2);
      expect(chunk.z).toBe(-3);
    });

    it('should store correct number of blocks', () => {
      const chunkSize = 16;
      const chunkHeight = 64;
      const expectedBlockCount = chunkSize * chunkHeight * chunkSize; // 16,384

      const chunk: Chunk = {
        x: 0,
        z: 0,
        blocks: new Uint8Array(expectedBlockCount),
        mesh: null,
      };

      expect(chunk.blocks.length).toBe(16384);
    });

    it('should allow setting block types in the blocks array', () => {
      const chunk: Chunk = {
        x: 0,
        z: 0,
        blocks: new Uint8Array(16 * 64 * 16),
        mesh: null,
      };

      chunk.blocks[0] = BlockType.GRASS;
      chunk.blocks[100] = BlockType.STONE;
      chunk.blocks[1000] = BlockType.WATER;

      expect(chunk.blocks[0]).toBe(BlockType.GRASS);
      expect(chunk.blocks[100]).toBe(BlockType.STONE);
      expect(chunk.blocks[1000]).toBe(BlockType.WATER);
    });

    it('should initialize all blocks to AIR (0) by default', () => {
      const chunk: Chunk = {
        x: 0,
        z: 0,
        blocks: new Uint8Array(16 * 64 * 16),
        mesh: null,
      };

      // Uint8Array initializes to 0, which is BlockType.AIR
      expect(chunk.blocks.every(block => block === BlockType.AIR)).toBe(true);
    });
  });

  describe('WorldSettings interface', () => {
    it('should create valid world settings', () => {
      const settings: WorldSettings = {
        chunkSize: 16,
        chunkHeight: 64,
        renderDistance: 3,
        seaLevel: 32,
      };

      expect(settings.chunkSize).toBe(16);
      expect(settings.chunkHeight).toBe(64);
      expect(settings.renderDistance).toBe(3);
      expect(settings.seaLevel).toBe(32);
    });

    it('should handle different chunk sizes', () => {
      const settings: WorldSettings = {
        chunkSize: 32,
        chunkHeight: 128,
        renderDistance: 5,
        seaLevel: 64,
      };

      expect(settings.chunkSize).toBe(32);
      expect(settings.chunkHeight).toBe(128);
    });

    it('should handle minimum values', () => {
      const settings: WorldSettings = {
        chunkSize: 1,
        chunkHeight: 1,
        renderDistance: 0,
        seaLevel: 0,
      };

      expect(settings.chunkSize).toBeGreaterThanOrEqual(1);
      expect(settings.chunkHeight).toBeGreaterThanOrEqual(1);
      expect(settings.renderDistance).toBeGreaterThanOrEqual(0);
      expect(settings.seaLevel).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Block data consistency', () => {
    it('should have consistent type field matching the enum key', () => {
      Object.entries(BLOCK_TYPES).forEach(([key, data]) => {
        expect(data.type).toBe(Number(key));
      });
    });

    it('should have non-empty names for all blocks', () => {
      Object.values(BLOCK_TYPES).forEach((block: BlockData) => {
        expect(block.name.length).toBeGreaterThan(0);
      });
    });

    it('should have valid THREE.Color objects', () => {
      Object.values(BLOCK_TYPES).forEach((block: BlockData) => {
        expect(block.color).toBeInstanceOf(THREE.Color);
        expect(block.color.r).toBeGreaterThanOrEqual(0);
        expect(block.color.r).toBeLessThanOrEqual(1);
        expect(block.color.g).toBeGreaterThanOrEqual(0);
        expect(block.color.g).toBeLessThanOrEqual(1);
        expect(block.color.b).toBeGreaterThanOrEqual(0);
        expect(block.color.b).toBeLessThanOrEqual(1);
      });
    });

    it('should only have transparent flag on expected blocks', () => {
      const transparentTypes = [BlockType.AIR, BlockType.WATER, BlockType.LEAVES];

      Object.values(BlockType)
        .filter(v => typeof v === 'number')
        .forEach(type => {
          const blockData = BLOCK_TYPES[type as BlockType];
          if (transparentTypes.includes(type as BlockType)) {
            expect(blockData.transparent).toBe(true);
          } else {
            expect(blockData.transparent).toBeUndefined();
          }
        });
    });
  });
});
