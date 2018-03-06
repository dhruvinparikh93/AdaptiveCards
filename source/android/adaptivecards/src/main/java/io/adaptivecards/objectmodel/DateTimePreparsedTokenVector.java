/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (http://www.swig.org).
 * Version 3.0.12
 *
 * Do not make changes to this file unless you know what you are doing--modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

package io.adaptivecards.objectmodel;

public class DateTimePreparsedTokenVector {
  private transient long swigCPtr;
  protected transient boolean swigCMemOwn;

  protected DateTimePreparsedTokenVector(long cPtr, boolean cMemoryOwn) {
    swigCMemOwn = cMemoryOwn;
    swigCPtr = cPtr;
  }

  protected static long getCPtr(DateTimePreparsedTokenVector obj) {
    return (obj == null) ? 0 : obj.swigCPtr;
  }

  protected void finalize() {
    delete();
  }

  public synchronized void delete() {
    if (swigCPtr != 0) {
      if (swigCMemOwn) {
        swigCMemOwn = false;
        AdaptiveCardObjectModelJNI.delete_DateTimePreparsedTokenVector(swigCPtr);
      }
      swigCPtr = 0;
    }
  }

  public DateTimePreparsedTokenVector() {
    this(AdaptiveCardObjectModelJNI.new_DateTimePreparsedTokenVector__SWIG_0(), true);
  }

  public DateTimePreparsedTokenVector(long n) {
    this(AdaptiveCardObjectModelJNI.new_DateTimePreparsedTokenVector__SWIG_1(n), true);
  }

  public long size() {
    return AdaptiveCardObjectModelJNI.DateTimePreparsedTokenVector_size(swigCPtr, this);
  }

  public long capacity() {
    return AdaptiveCardObjectModelJNI.DateTimePreparsedTokenVector_capacity(swigCPtr, this);
  }

  public void reserve(long n) {
    AdaptiveCardObjectModelJNI.DateTimePreparsedTokenVector_reserve(swigCPtr, this, n);
  }

  public boolean isEmpty() {
    return AdaptiveCardObjectModelJNI.DateTimePreparsedTokenVector_isEmpty(swigCPtr, this);
  }

  public void clear() {
    AdaptiveCardObjectModelJNI.DateTimePreparsedTokenVector_clear(swigCPtr, this);
  }

  public void add(DateTimePreparsedToken x) {
    AdaptiveCardObjectModelJNI.DateTimePreparsedTokenVector_add(swigCPtr, this, DateTimePreparsedToken.getCPtr(x), x);
  }

  public DateTimePreparsedToken get(int i) {
    long cPtr = AdaptiveCardObjectModelJNI.DateTimePreparsedTokenVector_get(swigCPtr, this, i);
    return (cPtr == 0) ? null : new DateTimePreparsedToken(cPtr, true);
  }

  public void set(int i, DateTimePreparsedToken val) {
    AdaptiveCardObjectModelJNI.DateTimePreparsedTokenVector_set(swigCPtr, this, i, DateTimePreparsedToken.getCPtr(val), val);
  }

}