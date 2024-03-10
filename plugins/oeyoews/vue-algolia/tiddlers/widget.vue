<template>
  {{ searchClient }}
  <ais-instant-search
    :search-client="searchClient"
    index-name="instant_search"
    :insights="true"
  >
    <ais-configure :hits-per-page.camel="8" />
    <div class="search-panel">
      <div class="search-panel__filters">
        <ais-panel>
          <template #header>brand</template>
          <ais-refinement-list attribute="brand" />
        </ais-panel>
      </div>

      <div class="search-panel__results">
        <div class="searchbox">
          <ais-search-box placeholder="" />
        </div>
        <ais-hits>
          <template slot="item" slot-scope="{ item }">
            <article>
              <h1>
                <ais-highlight :hit="item" attribute="name" />
              </h1>
              <p>
                <ais-highlight :hit="item" attribute="description" />
              </p>
            </article>
          </template>
        </ais-hits>

        <div class="pagination">
          <ais-pagination />
        </div>
      </div>
    </div>
  </ais-instant-search>
</template>
