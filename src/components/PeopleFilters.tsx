import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import React from 'react';
// import { getFilteredPeople } from '../utils/filterPeolpe';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const curSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  const handleCenturiesChange = (ch: string) => {
    const newList = centuries.includes(ch)
      ? centuries.filter(c => c !== ch)
      : [...centuries, ch];

    const params =
      newList.length > 0 ? { centuries: newList } : { centuries: null };

    return params;
  };

  function resetAll() {
    const params = new URLSearchParams();

    params.delete('century');
    setSearchParams(params);
  }

  const isActiveCentury = (str: string) => {
    return searchParams.getAll('centuries').includes(str);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={curSex === '' ? 'is-active' : ''}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={curSex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={curSex === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              params={handleCenturiesChange('16')}
              data-cy="century"
              className={
                isActiveCentury('16') ? 'button mr-1 is-active' : 'button mr-1'
              }
            >
              16
            </SearchLink>

            <SearchLink
              params={handleCenturiesChange('17')}
              data-cy="century"
              className={
                isActiveCentury('17') ? 'button mr-1 is-active' : 'button mr-1'
              }
            >
              17
            </SearchLink>

            <SearchLink
              params={handleCenturiesChange('18')}
              data-cy="century"
              className="button mr-1 is-info"
            >
              18
            </SearchLink>

            <SearchLink
              params={handleCenturiesChange('19')}
              data-cy="century"
              className="button mr-1 is-info"
            >
              19
            </SearchLink>

            <SearchLink
              params={handleCenturiesChange('20')}
              data-cy="century"
              className="button mr-1"
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block" onClick={resetAll}>
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
