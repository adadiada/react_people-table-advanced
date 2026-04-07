import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PeopleLink } from './PeopleLink';
// import { PeopleSort } from './PeopleSort';

type Props = {
  people?: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const { slug: id } = useParams();

  useEffect(() => {
    if (id) {
      setSelectedSlug(id);
    }
  }, [id]);

  const renderparents = (name?: string | null) => {
    if (!name) {
      return '-';
    }

    const p = people?.find(x => x.name === name);

    if (p) {
      return <PeopleLink person={p} name={name} />;
    }

    return <span>{name}</span>;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link to={{ pathname: '/people' }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
            onClick={() => setSelectedSlug(person.slug)}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderparents(person.motherName)}</td>
            <td>{renderparents(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
