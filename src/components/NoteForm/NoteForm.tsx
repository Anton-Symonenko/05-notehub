import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./NoteForm.module.css";
import type { NoteTag } from "../../types/note";
import type { CreateNoteParams } from "../../services/noteService"



interface NoteFormProps{
    onSubmit: (values: CreateNoteParams) => void;
    onCancel: () => void;
}

const initialValues: CreateNoteParams = {
    title: "",
    content: "",
    tag: "Todo",
};

const validationSchema = Yup.object({
    title: Yup.string()
        .min(2, "Minimum 2 characters")
        .max(30, "Maximum 30 characters")
        .required("Title is required"),
    
    content: Yup.string()
        .max(500, "Maximum 500 characters")
        .required("Content is required"),
  
    tag: Yup.mixed<NoteTag>()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
        .required("Tag is required"),
});

export default function NoteForm({
    onSubmit,
    onCancel,
}: NoteFormProps) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={css.form} >
                    <label className={css.formGroup}>
                        Title
                        <Field
                            className={css.input}
                            type="text"
                            name="title"
                        />
                        <ErrorMessage
                            name="title"
                            component="span"
                            className={css.error}
                        />
                    </label>
                    <label className={css.formGroup}>
                        Content
                        <Field
                            className={css.textarea}
                            as="textarea"
                            name="content"
                        />
                         <ErrorMessage
                            name="content"
                            component="span"
                            className={css.error}
                        />
                    </label>
                     <label className={css.formGroup}>
                        Tag
                        <Field
                            className={css.select}
                            as="select"
                            name="tag"
                        >
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                        </Field>
                    <ErrorMessage
                        name="tag"
                        component="span"
                        className={css.error}
                    />
                    </label>
                        <div className={css.actions}>
                            <button
                                className={css.cancelButton}
                                type="button"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className={css.submitButton}
                                type="submit"
                                disabled={isSubmitting}
                            >
                            Create note
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}