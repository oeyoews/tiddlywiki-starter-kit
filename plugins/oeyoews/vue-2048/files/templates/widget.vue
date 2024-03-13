<template>
  <div class="main-container appearing" :style="mainContainerStyle">
    <div class="score-container" :style="scoreContainerStyle">
      <div ref="gameAim" class="game-aim" v-bind:class="{ 'game-aim-reached': gameAimReached }" :style="gameAimStyle">
        {{ gameAim }}
      </div>
      <div class="scores" :style="scoreStyle">
        <div class="score">
          <div class="label">Score</div>
          <div>
            {{ score }}
            <transition>
              <span v-if="scoreInc != ''" class="score-inc">{{ scoreInc }}</span>
            </transition>
          </div>
        </div>&nbsp;
        <div class="score">
          <div class="label">Best</div>
          <div>{{ bestScore[size] }}</div>
        </div>
      </div>
    </div>
    <div class="game-controls" :style="gameControlsStyle">
      <div class="size-control" v-if="!gameStarted">
        Size:
        <template v-for="s in sizes">
          <input type="radio" :id="'size-radio' + s" :value="s" v-model.number="size" />
          <label :for="'size-radio' + s">{{ s }}</label>
        </template>&nbsp;
      </div>
      <button v-if="!gameStarted" @click="startGame()" class="button" :style="buttonStyle" key="start">New
        Game</button>
      <button v-else @click="gameStarted = false" class="button" :style="buttonStyle" key="end">End</button>
    </div>
    <div class="game-container" :style="gameContainerStyle">
      <div v-if="gameEnded">
        <div class="overlay half-white appearing07"></div>
        <div class="overlay game-over appearing" :style="gameOverStyle">
          <p>Game over!</p>
        </div>
      </div>
      <game-2048 ref="game" :size="size" :size-aim-map="sizeAimMap" :listen-own-key-events-only="false" :tab-index="1"
        :board-size-px="boardSizePx" :started="gameStarted" @started="onGameStarted" @ended="onGameEnded"
        @score="onGameScore" @aim-changed="onGameAimChanged" @aim-reached="onGameAimReached"></game-2048>
    </div>
    <div class="game-awards-container" :style="gameAwardsContainerStyle">
      <game2048-award ref="awards" v-for="a in awards" key="a.aim" :award="a" :style="gameAwardStyle"
        :like-style="gameAwardLikeStyle"></game2048-award>
    </div>
    <div style="display:none" ref="collectAllAwards" class="collect-all-awards" v-if="!allAwardsObtained">
      <span>Collect all awards!</span>
    </div>
  </div>

  <!-- <template id="game2048" hidden>
    <div class="board" :tabindex="tabIndex" :style="boardStyle">
      <div ref="cells" v-for="(cl, index) in cells" class="cell" :key="cl" :style="cellStyle">
        <game2048-chip ref="chips" v-for="(ch, i) in cl.chips" :key="ch" :animation-time-ms="animationTimeMs" :chip="ch"
          :size-px="cellSizePx"></game2048-chip>
      </div>
    </div>
  </template> -->
</template>