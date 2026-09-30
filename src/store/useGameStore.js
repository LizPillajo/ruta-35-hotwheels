import { create } from 'zustand'

export const useGameStore = create((set) => ({
  level: 1,
  flowers: 0,
  lives: 3,
  isPlaying: false,
  showVoucher: false,
  currentVoucher: null,
  isFinished: false,
  flowersNeeded: 10, 

  startGame: () => set({ 
    isPlaying: true, 
    showVoucher: false,
    isFinished: false,
    lives: 3, 
    flowers: 0,
    level: 1,
    flowersNeeded: 10
  }),
  
  collectFlower: () => set((state) => ({ flowers: state.flowers + 1 })),

  loseLife: () => set((state) => ({ 
    lives: Math.max(0, state.lives - 1)
  })),

  winLevel: (voucherInfo) => set({
    isPlaying: true,
    showVoucher: true,
    currentVoucher: voucherInfo
  }),

  nextLevel: () => set((state) => ({
    level: state.level + 1,
    flowers: 0,
    flowersNeeded: state.level === 1 ? 15 : 20, 
    showVoucher: false,
    isPlaying: true
  })),

  finishGame: () => set({ 
    isFinished: true, 
    showVoucher: false, 
    isPlaying: false 
  }),

  resetGame: () => set({
    level: 1,
    flowers: 0,
    lives: 3,
    flowersNeeded: 10,
    isPlaying: false,
    showVoucher: false,
    currentVoucher: null,
    isFinished: false
  })
}))