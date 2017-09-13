import React, {
  PropTypes,
} from 'react';

/**
 * Renders Sidebar as functional component
 * @param  {Object} props Topic to display
 * @return {ReactElement}
 */
const Sidebar = (props) => {
  const { topic } = props;
  if (topic === null) {
    return (
      <div className="wordcloud__container_sidebar">
        <div className="wordcloud__sidebar">
          <h1 className="wordcloud__sidebar_title">Informations</h1>
          <p className="wordcloud__description">
            Choisissez un mot du nuage pour en afficher les détails.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="wordcloud__container_sidebar">
      <div className="wordcloud__sidebar">
        <h1 className="wordcloud__sidebar_title">Informations sur le mot "{topic.label}"</h1>
        <table className="wordcloud__sidebar_metatable">
          <thead>
          </thead>
          <tbody>
            <tr className="wordcloud__sidebar_metatable_row">
             <td className="wordcloud__sidebar_metatable_label">Poids: </td>
             <td className="wordcloud__sidebar_metatable_value">{topic.volume || '0'}</td>
            </tr>
            <tr className="wordcloud__sidebar_metatable_row">
              <td className="wordcloud__sidebar_metatable_label">Positivité: </td>
              <td className="wordcloud__sidebar_metatable_value wordcloud__sidebar_metatable_value--color-green">
                {topic.sentiment.positive || '0'}
              </td>
            </tr>
            <tr className="wordcloud__sidebar_metatable_row">
              <td className="wordcloud__sidebar_metatable_label">Neutralité: </td>
              <td className="wordcloud__sidebar_metatable_value wordcloud__sidebar_metatable_value--color-grey">
                {topic.sentiment.neutral || '0'}
              </td>
           </tr>
            <tr className="wordcloud__sidebar_metatable_row">
              <td className="wordcloud__sidebar_metatable_label">Negativité: </td>
              <td className="wordcloud__sidebar_metatable_value wordcloud__sidebar_metatable_value--color-red">
                {topic.sentiment.negative || '0'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  topic: PropTypes.object,
};

Sidebar.defaultProps = {
  topic: null,
};

export default Sidebar;
