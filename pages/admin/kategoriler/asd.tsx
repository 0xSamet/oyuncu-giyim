

useEffect(() => {
  if (
    updateCategoryResponse &&
    updateCategoryResponse.updateCategory &&
    updateCategoryResponse.updateCategory.name
  ) {
    router.push("/admin/kategoriler");
  }
}, [updateCategoryResponse]);

const handleFormSubmit = async () => {
  let parentId;
  let sortOrder;

  if (fields.parent_id) {
    parentId = Number(fields.parent_id);
  } else {
    parentId = null;
  }

  if (!isNaN(fields.sort_order) && fields.sort_order) {
    sortOrder = Number(fields.sort_order);
  } else {
    sortOrder = null;
  }

  try {
    await updateCategoryRun({
      variables: {
        input: {
          id: fields.id,
          name: fields.name,
          meta_title: fields.meta_title,
          meta_description: fields.meta_description,
          meta_keyword: fields.meta_keyword,
          parent_id: parentId,
          sort_order: sortOrder,
          status: fields.status,
          slug: fields.slug,
        },
      },
    });
  } catch (err) {
    console.log(err);
    dispatch(putAdminRequestError(err.message));
  }
};
